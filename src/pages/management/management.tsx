import { useEffect, useState } from 'react';
import { Row, Col, Skeleton, Input, Divider } from 'antd';

import { ManagementSupplyCard } from 'src/components/supply/manage-card';
import { SupplyWithSelected } from 'src/models/supply';
import { useGetOwnSuppliesQuery } from 'src/services/supply';
import { ActionBox } from './action-box';
import { PostsMangementContext } from 'src/contexts/management';

import { ManagementMain } from './styled';

export const PostsManagementPage = () => {
  const { data: supplies, isFetching } = useGetOwnSuppliesQuery();
  const [_supplies, _setSupplies] = useState<SupplyWithSelected[]>([]);

  useEffect(() => {
    if (supplies) {
      _setSupplies(supplies.map((_) => ({ ..._, selected: false })));
    }
  }, [supplies]);

  const onCheck = (index: number) => {
    const newSupplies = [..._supplies];
    newSupplies[index].selected = !newSupplies[index].selected;

    _setSupplies(newSupplies);
  };

  const onSearch = (query: string) => {
    const newSupplies = (supplies || [])
      .filter((_) => _.name.toLowerCase().includes(query.toLowerCase()))
      .map((_) => ({ ..._, selected: false }));

    _setSupplies(newSupplies);
  };

  return (
    <PostsMangementContext.Provider
      value={{
        supplies: _supplies || [],
        setSupplies: _setSupplies,
      }}
    >
      <Row gutter={16}>
        <ManagementMain xs={12} sm={8}>
          <div className="col-content">
            <ActionBox />
          </div>
        </ManagementMain>
        <ManagementMain xs={12} sm={16}>
          <div className="col-content">
            <Row>
              <Col span={24}>
                <Input.Search
                  placeholder="Tìm kiếm tin"
                  allowClear
                  onChange={(event) => onSearch(event.target.value)}
                  style={{ width: '100%' }}
                />
              </Col>
            </Row>
            <Divider />
            <Row gutter={[8, 8]}>
              {isFetching
                ? [...Array(8).keys()].map((index) => (
                    <Col xs={24} sm={12} md={6} key={index}>
                      <Skeleton.Image />
                      <Skeleton active />
                    </Col>
                  ))
                : _supplies.map((supply, index) => (
                    <Col xs={24} sm={12} md={6} key={supply.id}>
                      <ManagementSupplyCard
                        supply={supply}
                        checked={supply.selected}
                        onCheck={() => onCheck(index)}
                      />
                    </Col>
                  ))}
            </Row>
          </div>
        </ManagementMain>
      </Row>
    </PostsMangementContext.Provider>
  );
};
