import type { FC } from 'react';
import AppRoutes from 'router/AppRoutes';
import AppWrapper from 'components/AppWrapper';
import Theme from 'theme/Theme';
import { useAppSelector } from 'redux/redux-hooks';
import './styles/App.scss';

interface Props {}

const App:FC<Props> = (): JSX.Element => {
  const themeMode = useAppSelector(({ context }) => context.themeMode);
  console.log(themeMode);
  return (
    <Theme themeMode={themeMode}>
      <AppWrapper>
        <AppRoutes />
      </AppWrapper>
    </Theme>
  );
};

export default App;
