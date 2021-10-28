import type { FC } from 'react';
import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import 'semantic-ui-css/semantic.min.css';
import {
  Dimmer,
  Loader,
} from 'semantic-ui-react';
import { checkInitAuth } from './utils/auth-helpers';
import { Paths } from 'types/globals';
import pollyFills from 'utils/pollyfills';

pollyFills();

const App = React.lazy(() => import('./App'));
const Program = React.lazy(() => import('./pages/Program'));
const ProgramPrint = React.lazy(() => import('./pages/ProgramPrint'));
const LoginPage = React.lazy(() => import('./components/Login'));
const Loading:FC = () => (
  <Dimmer active>
    <Loader size="medium">Verifierar ...</Loader>
  </Dimmer>
);

const renderDom = (content: JSX.Element) => ReactDOM!.render(
  (
    <React.Suspense fallback={<Loading />}>
      {content}
    </React.Suspense>
  ),
  document.getElementById('root'),
);

const getCmpnt = () => {
  const path = window.location.pathname;
  switch (path) {
    case Paths.PROGRAM:
      return Program;
    case Paths.PROGRAM_PRINT:
      return ProgramPrint;
    default:
      return App;
  }
};

const renderApp = () => {
  const Cmpnt = getCmpnt();
  renderDom(
    <Provider store={store}>
      <Cmpnt />
    </Provider>,
  );
};

const renderLogin = () => {
  renderDom(<LoginPage />);
};

const initAuth = async () => {
  renderDom(<Loading />);
  const isAuth = await checkInitAuth();

  if (isAuth) {
    renderApp();
  } else {
    renderLogin();
  }
};

initAuth();
