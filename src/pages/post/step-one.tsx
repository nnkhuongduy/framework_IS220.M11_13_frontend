import { Row, Col, List, Button } from 'antd';
import { useContext } from 'react';
import { AiOutlineArrowRight } from 'react-icons/ai';

import { Category } from 'src/models/category';
import { useGetPrimaryCategoriesQuery } from 'src/services/category';
import { PostContext } from './post';

export const StepOne = () => {
  const { setCurrentStep, setSteps, steps } = useContext(PostContext);
  
  const { data: primaryCategories } = useGetPrimaryCategoriesQuery();

  const onNext = (category: Category) => {
    const newSteps = [...steps];
    newSteps[0].content = {
      primaryCategory: category.id,
    };
    newSteps[0].finished = true;

    setSteps(newSteps);
    setCurrentStep(1);
  };

  return (
    <List
      bordered
      dataSource={primaryCategories || []}
      renderItem={(item) => (
        <List.Item>
          <Row style={{ width: '100%' }} align="middle" gutter={8}>
            <Col>
              <img className="cate-img" src={item.image} alt={item.name} />
            </Col>
            <Col flex="auto">{item.name}</Col>
            <Col>
              <Button
                icon={
                  <AiOutlineArrowRight
                    className="button-icon"
                    style={{ marginRight: 0 }}
                  />
                }
                onClick={() => onNext(item)}
              ></Button>
            </Col>
          </Row>
        </List.Item>
      )}
    />
  );
};
