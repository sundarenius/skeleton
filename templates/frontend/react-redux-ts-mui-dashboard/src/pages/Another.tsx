import type { FC } from 'react';

interface Props {}

const Another:FC<Props> = (): JSX.Element => {
  const txt = 'Another page';
  return (
    <div id="another-container">
      <h3>{txt}</h3>
    </div>
  );
};

export default Another;
