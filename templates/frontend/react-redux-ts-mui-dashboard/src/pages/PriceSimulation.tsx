import type { FC } from 'react';
import BlockContainer from 'components/BlockContainer';

interface Props {}

const Another:FC<Props> = (): JSX.Element => {
  const txt = 'Price Simulation page';
  return (
    <BlockContainer>
      <h3>{txt}</h3>
    </BlockContainer>
  );
};

export default Another;
