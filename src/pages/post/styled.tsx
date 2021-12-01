import styled from 'styled-components';
import { Row, Form } from 'antd';

export const PostMain = styled(Row)`
  background: white;
  padding: 40px 20px;

  h2 {
    color: ${(props) => props.theme.colors.primary.main};
  }

  .cate-img {
    width: 50px;
    height: 50px;
    border-radius: 100%;
    object-fit: cover;
  }
`;

export const StepThreeForm = styled(Form)`
  margin: 0 auto;
  max-width: 600px;
  width: 90%;
`;

export const UploadedImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: contain;
`;

export const UploadedContainer = styled.div`
  position: relative;

  button {
    position: absolute;
    top: 20px;
    right: 20px;
    background: rgba(0, 0, 0, 0.5);
    color: rgba(255, 255, 255, 0.5);

    &:hover {
      background: rgba(0, 0, 0, 1);
      color: rgba(255, 255, 255, 1);
    }

    svg {
      margin: 0;
    }
  }
`;
