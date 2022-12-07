import type { FC } from 'react';

interface Props {}

const Home:FC<Props> = (): JSX.Element => {
  const txt = 'Home page';
  return (
    <h1>
      {txt}
    </h1>
  );
};

export default Home;
