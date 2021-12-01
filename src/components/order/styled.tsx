import styled from 'styled-components';

export const CardMain = styled.div<{ grayFilter?: boolean; checked?: boolean }>`
  text-align: left;
  position: relative;
  overflow: hidden;
  transition: ${(props) => props.theme.transition};
  filter: ${(props) =>
    props.grayFilter ? (props.checked ? 'none' : 'grayscale(1)') : 'none'};

  &:hover {
    filter: none;
  }

  h4 {
    font-weight: 600;
    margin: 0;
    margin-top: 10px;
    line-height: 140%;
  }

  p {
    margin: 0;
  }

  .price {
    color: ${(props) => props.theme.colors.primary.main};
    font-size: 20px;
    font-weight: bold;
  }

  .location {
    font-size: 10px;
    color: gray;
  }
`;
