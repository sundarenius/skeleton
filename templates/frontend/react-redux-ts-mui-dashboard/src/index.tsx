import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Loading from 'components/Loading';
import { isAuth } from 'utils/helpers';
import type {
  ISessionStorageData,
} from 'types/globals';

const App = React.lazy(() => import('./App'));
const Login = React.lazy(() => import('./components/Login'));

const root = createRoot(document.getElementById('root') as HTMLElement);

const renderDom = (content: JSX.Element) => {
  root.render(
    <React.Suspense fallback={<Loading />}>
      {content}
    </React.Suspense>,
  );
};

const renderApp = (args) => {
  renderDom(
    <Provider store={store}>
      <App initData={args} />
    </Provider>,
  );
};

const renderLogin = () => {
  renderDom(<Login />);
};

const renderLoading = () => {
  renderDom(<Loading />);
};

renderLoading();

const init = async () => {
  const {
    THEME_MODE,
    SELECTED_MERCHANT,
    isAuthenticated,
  } = await isAuth() as ISessionStorageData;

  if (isAuthenticated) {
    renderApp({
      THEME_MODE,
      SELECTED_MERCHANT,
    });
  } else {
    renderLogin();
  }
};

init();

declare global {
  interface Window {
    IS_BELOW_SM: any;
    INIT_DATA_FETCH: any
  }
}

window.IS_BELOW_SM = window.innerWidth <= 600;
