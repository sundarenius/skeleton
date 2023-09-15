import type { FC } from 'react';
import { useEffect } from 'react';
import AppRoutes from 'router/AppRoutes';
import AppWrapper from 'components/AppWrapper';
import WhileFetchingWrapper from 'components/WhileFetchingWrapper';
import Theme from 'theme/Theme';
import { useAppSelector, useAppDispatch } from 'redux/redux-hooks';
import { contextActions } from 'redux/actions';
import { store } from 'redux/store';
import './styles/App.scss';
import type { ThemeModes } from 'types/globals';

interface Props {
  initData: Record<string, any>
}

const App:FC<Props> = ({ initData }): JSX.Element => {
  const dispatch = useAppDispatch();
  const {
    themeMode,
    merchant,
  } = useAppSelector(({ context }) => context);

  useEffect(() => {
    if (initData.SELECTED_MERCHANT) {
      dispatch(contextActions.setMerchant(initData.SELECTED_MERCHANT));
    }
    if (initData.THEME_MODE) {
      dispatch(contextActions.setThemeMode(initData.THEME_MODE as ThemeModes));
    }
  }, [dispatch, initData]);

  return (
    <Theme themeMode={themeMode}>
      <AppWrapper>
        <WhileFetchingWrapper>
          <AppRoutes />
        </WhileFetchingWrapper>
      </AppWrapper>
    </Theme>
  );
};

export default App;
