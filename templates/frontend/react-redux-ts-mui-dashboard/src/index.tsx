import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Loading from 'components/Loading';

const App = React.lazy(() => import('./App'));

const root = createRoot(document.getElementById('root') as HTMLElement);

const renderDom = (content: JSX.Element) => {
  root.render(
    <React.Suspense fallback={<Loading />}>
      {content}
    </React.Suspense>,
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
