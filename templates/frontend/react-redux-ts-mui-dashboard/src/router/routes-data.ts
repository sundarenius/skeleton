import { lazy } from 'react';
import type { FC } from 'react';
import { Paths } from 'types/globals';
import {
  MoveToInbox,
  AutoAwesome,
} from '@mui/icons-material';
import type {
  RouteObject,
} from 'react-router-dom';

const Home = lazy(() => import('pages/Home'));
const PriceSimulation = lazy(() => import('pages/PriceSimulation'));

console.log(Paths);

interface IRouterData extends Omit<RouteObject, 'element'> {
  name: string,
  icon: FC,
  element: FC,
}

const routerData: IRouterData[] = [
  {
    name: 'Home',
    path: Paths.ROOT,
    element: Home,
    icon: MoveToInbox,
  },
  {
    name: 'Simulation',
    path: Paths.PRICE_SIMULATION,
    element: PriceSimulation,
    icon: AutoAwesome,
  },
];

const routeData = (path: Paths) => routerData.find((r) => r.path === path);
export const sideBarNav = [
  {
    name: 'Section 1',
    navs: [
      routeData(Paths.ROOT),
    ],
  },
  {
    name: 'Section 2',
    navs: [
      routeData(Paths.PRICE_SIMULATION),
    ],
  },
];

export default routerData;
