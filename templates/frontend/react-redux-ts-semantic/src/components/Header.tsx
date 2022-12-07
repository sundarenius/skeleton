import type { FC } from 'react';

interface Props {}

const Header:FC<Props> = (): JSX.Element => {
  const txt = 'Header page';
  return (
    <h1>
      {txt}
    </h1>
  );
};

export default Header;
