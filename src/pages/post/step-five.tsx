import { useContext, useEffect, useState } from 'react';
import { Radio, Row, Col, Button, Modal, Typography } from 'antd';

import { PostContext } from 'src/pages/post/post';
import { useAppSelector } from 'src/hooks/store';
import { selectCurrentUser } from 'src/slices/auth';
import { getBase64 } from 'src/helpers/get-base-64';
import { useGetSecondaryCategoriesQuery } from 'src/services/category';
import {
  useGetProvincesQuery,
  useGetWardsFromProvinceQuery,
  useGetBlocksFromWardQuery,
} from 'src/services/location';
import { SupplyDetail } from 'src/components/supply/detail';
import { SupplyCard } from 'src/components/supply/card';
import { PostSupply, Supply } from 'src/models/supply';
import { useHttpError } from 'src/hooks/http';
import {
  useUploadThumbnailMutation,
  useUploadImagesMutation,
} from 'src/services/upload';
import { useCreateSupplyMutation } from 'src/services/supply';
import { SUPPLY_CONSTANTS } from 'src/constants/supply';

type Mode = 'DETAIL' | 'CARD';

export const StepFive = () => {
  const { steps, currentStep, setCurrentStep, setSteps } =
    useContext(PostContext);
  const user = useAppSelector(selectCurrentUser);

  const { data: secondaryCategories } = useGetSecondaryCategoriesQuery(
    steps[0].content.primaryCategory
  );
  const { data: provinces } = useGetProvincesQuery();
  const { data: wards } = useGetWardsFromProvinceQuery(
    steps[2].content.province
  );
  const { data: blocks } = useGetBlocksFromWardQuery(steps[2].content.ward);
  const [uploadThumbnail, { isLoading: isUploadingThumbnail }] =
    useUploadThumbnailMutation();
  const [uploadImages, { isLoading: isUploadingImages }] =
    useUploadImagesMutation();
  const [createSuppy, { isLoading: isCreatingSupply }] =
    useCreateSupplyMutation();

  const [mode, setMode] = useState<Mode>('DETAIL');
  const [supply, setSupply] = useState<Supply>();
  const [imageUrl, setImageUrl] = useState<string>();
  const [thumbnail, setThumbnail] = useState<string>('');
  const [confirmationVisible, setConfirmationVisible] = useState(false);

  const httpError = useHttpError();

  useEffect(() => {
    let result = undefined;

    if (secondaryCategories && provinces && wards && blocks && user) {
      result = {} as Supply;

      const province = provinces.find(
        (_) => _.id === steps[2].content.province
      )!;
      const ward = wards.find((_) => _.id === steps[2].content.ward)!;
      const block = blocks.find((_) => _.id === steps[2].content.block)!;

      steps[3].content.images.forEach((image: File) => {
        getBase64(image, (url) => setImageUrl(url));
      });
      getBase64(steps[3].content.thumbnail, (url) => setThumbnail(url));

      result.id = '';
      result.owner = user;
      result.name = steps[3].content.name;
      result.price = steps[3].content.price;
      result.description = steps[3].content.description;
      result.services = [];
      result.specs = (
        secondaryCategories.find(
          (_) => _.id === steps[1].content.secondaryCategory
        ) || { specs: [] }
      ).specs.map((spec) => ({
        ...spec,
        value: (steps[3].content.specs || {})[spec.id],
      }));
      result.images = [];
      result.thumbnail = '';
      result.categories = [];
      result.locations = [province, ward, block];
      result.address = steps[2].content.address;
      result.productStatus = 0;
      result.status = 0;
      result.createdOn = new Date().toString();
      result.modifiedOn = new Date().toString();
    }

    setSupply(result);
    //eslint-disable-next-line
  }, [secondaryCategories, provinces, wards, blocks, user]);

  useEffect(() => {
    if (supply && imageUrl) {
      setSupply({ ...supply, images: [...supply.images, imageUrl] });
    }
    //eslint-disable-next-line
  }, [imageUrl]);

  useEffect(() => {
    if (supply) {
      setSupply({ ...supply, thumbnail });
    }
    //eslint-disable-next-line
  }, [thumbnail]);

  const onPostSupply = async () => {
    try {
      const thumbnailFormData = new FormData();
      const imagesFormData = new FormData();

      thumbnailFormData.append('thumbnail', steps[3].content.thumbnail);
      steps[3].content.images.forEach((image: File) => {
        imagesFormData.append('images', image);
      });

      const thumbnailUrl = (await uploadThumbnail(thumbnailFormData).unwrap())
        .url;
      const imageUrls = (await uploadImages(imagesFormData).unwrap()).urls;

      const form: PostSupply = {
        name: steps[3].content.name,
        price: steps[3].content.price,
        description: steps[3].content.description,
        specs: Object.keys(steps[3].content.specs).map((id) => ({
          id,
          value: steps[3].content.specs[id],
        })),
        images: imageUrls,
        thumbnail: thumbnailUrl,
        categories: [
          steps[0].content.primaryCategory as string,
          steps[1].content.secondaryCategory as string,
        ],
        locations: [
          steps[2].content.province,
          steps[2].content.ward,
          steps[2].content.block,
        ],
        address: steps[2].content.address as string,
      };

      await createSuppy(form).unwrap();

      setConfirmationVisible(false);
      setSteps(SUPPLY_CONSTANTS.DEFAULT_STEPS);
      setCurrentStep(currentStep + 1);
    } catch (error) {
      httpError(error);
    }
  };

  return (
    <>
      <Row align="middle" gutter={[16, 16]}>
        <Col span={24} style={{ textAlign: 'center' }}>
          <Row>
            <Col>
              <Button onClick={() => setCurrentStep(currentStep - 1)}>
                Quay lại
              </Button>
            </Col>
            <Col flex="auto">
              <Radio.Group
                value={mode}
                onChange={(event) => setMode(event.target.value as Mode)}
              >
                <Radio.Button value="DETAIL">Chi tiết</Radio.Button>
                <Radio.Button value="CARD">Tổng quát</Radio.Button>
              </Radio.Group>
            </Col>
            <Col>
              <Button
                type="primary"
                onClick={() => setConfirmationVisible(true)}
              >
                Đăng
              </Button>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          {supply ? (
            mode === 'DETAIL' ? (
              <SupplyDetail supply={supply} preview />
            ) : (
              <SupplyCard
                supply={supply}
                style={{ width: '180px', margin: '0 auto' }}
                preview
              />
            )
          ) : null}
        </Col>
      </Row>
      <Modal
        title="Xác nhận"
        visible={confirmationVisible}
        onOk={onPostSupply}
        onCancel={() => setConfirmationVisible(false)}
        centered
        destroyOnClose
        confirmLoading={
          isUploadingThumbnail || isUploadingImages || isCreatingSupply
        }
        okText="Xác nhận"
        cancelText="Hủy"
      >
        <Typography.Paragraph>
          Xác nhận thông tin đã cung cấp và đăng sản phẩm lên 99Phầntrăm?
        </Typography.Paragraph>
      </Modal>
    </>
  );
};
