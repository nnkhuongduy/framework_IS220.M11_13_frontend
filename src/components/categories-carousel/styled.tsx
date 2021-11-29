import { Carousel } from 'antd';
import styled from 'styled-components';

export const StyledCarousel = styled(Carousel)`
  margin-top: 50px;
  margin-bottom: 20px;

  .arrow-container {
    width: 30px;
    height: 30px;
    border-radius: 100%;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    background: white;

    &::before {
      display: none;
    }

    &:hover {
      background: white;

      svg {
        color: ${(props) => props.theme.colors.primary.main};
      }
    }

    &.slick-next {
      right: -35px;
    }

    &.slick-prev {
      left: -35px;
    }

    svg {
      width: 15px;
      height: 15px;
      color: black;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
`;

export const Image = styled.img`
  margin: 0px auto;
  width: 120px;
  height: 120px;
  border-radius: 100%;
  margin-bottom: 10px;
  object-fit: cover;
`;
