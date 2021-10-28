import type { FC } from 'react';
import AppRoutes from 'router/AppRoutes';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from 'components/Header';
import './styles/App.scss';

interface Props {}

const App:FC<Props> = (): JSX.Element => (
  <Router>
    <Header />

    <AppRoutes />

  </Router>
);

export default App;
