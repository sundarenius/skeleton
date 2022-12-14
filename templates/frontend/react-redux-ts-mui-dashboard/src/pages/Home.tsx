import type { FC } from 'react';
import BlockContainer from 'components/BlockContainer';

interface Props {}

const Home:FC<Props> = (): JSX.Element => {
  const txt = 'Home page';
  return (
    <BlockContainer>
      <h1>
        {txt}
      </h1>
    </BlockContainer>
  );
};

export default Home;
