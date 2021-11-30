import { Row, Col, List, Button } from 'antd';
import { useContext } from 'react';
import { AiOutlineArrowRight } from 'react-icons/ai';

import { Category } from 'src/models/category';
import { useGetSecondaryCategoriesQuery } from 'src/services/category';
import { PostContext } from './post';

export const StepTwo = () => {
  const { setCurrentStep, setSteps, steps } = useContext(PostContext);

  const { data: secondaryCategories } = useGetSecondaryCategoriesQuery(steps[0].content.primaryCategory);

  const onNext = (category: Category) => {
    const newSteps = [...steps];
    newSteps[1].content = {
      secondaryCategory: category.id,
    };
    newSteps[1].finished = true;

    setSteps(newSteps);
    setCurrentStep(2);
  };

  return (
    <List
      bordered
      dataSource={secondaryCategories || []}
      renderItem={(item) => (
        <List.Item>
          <Row style={{ width: '100%' }} align="middle" gutter={8}>
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
