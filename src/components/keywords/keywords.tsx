import { FC } from 'react';
import { Col } from 'antd';
import { Link } from 'react-router-dom';

import { KeywordsMain } from './styled';

export const Keywords: FC<{ keywords: string[] }> = ({ keywords }) => {
  return (
    <KeywordsMain gutter={[8, 8]}>
      {keywords.map((keyword, index) => (
        <Col xs={24} sm={12} md={6} key={index}>
          <Link to="/">{keyword}</Link>
        </Col>
      ))}
    </KeywordsMain>
  );
};
