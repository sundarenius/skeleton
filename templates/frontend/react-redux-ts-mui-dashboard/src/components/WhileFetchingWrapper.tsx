import type { FC } from 'react';
import Loading from 'components/Loading';
import { useAppSelector } from 'redux/redux-hooks';

interface Props {
  children,
}

const WhileFetchingWrapper:FC<Props> = ({ children }): JSX.Element => {
  const isFetching = useAppSelector(({ context }) => context.isFetchingData);
  const style = {
    position: 'absolute',
    height: '100vh',
    width: '100vw',
    top: '0',
    left: '0',
    zIndex: '10000',
    backdropFilter: 'blur(1px)',
  };
  return isFetching ? (
    <div style={style as Record<string, string>}>
      <Loading text="Getting data ..." />
    </div>
  ) : (
    <div id="while-fetching-wrapper-container">
      {children}
    </div>
  );
};

export default WhileFetchingWrapper;
