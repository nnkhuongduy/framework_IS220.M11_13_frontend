import { useContext, useMemo } from 'react';
import { Input } from 'antd';

import { PostContext } from 'src/pages/post/post';
import { useGetSecondaryCategoriesQuery } from 'src/services/category';
import { Spec } from 'src/models/spec';

import { SpecFormItem } from './styled';

export const SupplyPostingSpecsForm = () => {
  const { steps } = useContext(PostContext);
  const { data: secondaryCategories } = useGetSecondaryCategoriesQuery(
    steps[0].content.primaryCategory
  );

  const specs = useMemo<Spec[]>(() => {
    if (secondaryCategories) {
      return (
        secondaryCategories.find(
          (_) => _.id === steps[1].content.secondaryCategory
        ) || { specs: [] }
      ).specs;
    }

    return [];
    //eslint-disable-next-line
  }, [secondaryCategories]);

  return (
    <>
      {specs.map((spec) => (
        <SpecFormItem
          required={spec.required}
          label={spec.name}
          name={['specs', spec.id]}
          rules={[
            { required: spec.required, message: 'Vui lòng nhập giá trị!' },
          ]}
          key={spec.id}
        >
          <Input />
        </SpecFormItem>
      ))}
    </>
  );
};
