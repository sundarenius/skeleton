import type { FC } from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
import { Paths } from 'types/globals';
import Home from 'pages/Home';

const AppRoutes:FC = (): JSX.Element => (
  <Switch>
    <Route exact path={Paths.HOME} component={Home} />
  </Switch>
);

export default AppRoutes;
