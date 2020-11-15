import React, { FC } from 'react';

interface TestTsProps {
  title: string;
}

const TestTs: FC<TestTsProps> = ({ title }) => {
  return <h1>{title} world</h1>;
};

export default TestTs;
