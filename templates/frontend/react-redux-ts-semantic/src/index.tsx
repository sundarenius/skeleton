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

const App = React.lazy(() => import('./App'));

const Loading:FC = () => (
  <Dimmer active>
    <Loader size="medium">Laddar ...</Loader>
  </Dimmer>
);

const renderDom = (content: JSX.Element) => {
  ReactDOM.render(
    (
      <React.Suspense fallback={<Loading />}>
        {content}
      </React.Suspense>
    ),
    document.getElementById('root'),
  );
};

const renderApp = () => {
  renderDom(
    <Provider store={store}>
      <App />
    </Provider>,
  );
};

renderApp();
