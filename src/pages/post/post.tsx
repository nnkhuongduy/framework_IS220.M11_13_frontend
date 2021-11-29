import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import { Col, Typography, Steps } from 'antd';

import { StepOne } from './step-one';
import { StepTwo } from './step-two';
import { StepThree } from './step-three';
import { StepFour } from './step-four';
import { StepFive } from './step-five';
import { StepSix } from './step-six';
import { SUPPLY_CONSTANTS } from 'src/constants/supply';
import { PostSupplyStep } from 'src/models/supply';

import { PostMain } from './styled';

export const PostContext = createContext<{
  steps: PostSupplyStep[];
  currentStep: number;
  setSteps: Dispatch<SetStateAction<PostSupplyStep[]>>;
  setCurrentStep: Dispatch<SetStateAction<number>>;
}>({
  steps: SUPPLY_CONSTANTS.DEFAULT_STEPS,
  currentStep: 0,
  setSteps: () => {},
  setCurrentStep: () => {},
});

const PostContent = () => {
  const { currentStep } = useContext(PostContext);

  switch (currentStep) {
    case 0:
      return <StepOne />;
    case 1:
      return <StepTwo />;
    case 2:
      return <StepThree />;
    case 3:
      return <StepFour />;
    case 4:
      return <StepFive />;
    case 5:
      return <StepSix />;

    default:
      return null;
  }
};

export const PostSupply = () => {
  const [steps, setSteps] = useState<PostSupplyStep[]>(SUPPLY_CONSTANTS.DEFAULT_STEPS);
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <PostContext.Provider
      value={{
        steps,
        currentStep,
        setSteps,
        setCurrentStep,
      }}
    >
      <PostMain gutter={[0, 16]}>
        <Col span={24}>
          <Typography.Title level={2} style={{ textAlign: 'center' }}>
            {steps[currentStep].title}
          </Typography.Title>
        </Col>
        <Col span={24}>
          <Steps
            progressDot
            current={currentStep}
            style={{ width: '80%', margin: '0 auto' }}
          >
            <Steps.Step />
            <Steps.Step />
            <Steps.Step />
            <Steps.Step />
            <Steps.Step />
            <Steps.Step />
          </Steps>
        </Col>
        <Col span={24}>
          <PostContent />
        </Col>
      </PostMain>
    </PostContext.Provider>
  );
};
