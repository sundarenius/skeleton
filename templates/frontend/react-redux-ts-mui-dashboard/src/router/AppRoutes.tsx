import type { FC } from 'react';
import { useEffect, useCallback, Suspense } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from 'react-router-dom';
import type {
  RouteObject,
} from 'react-router-dom';
import RouteData from './routes-data';
import { PostMessageEvents } from 'types/globals';
import Loading from 'components/Loading';

const RouteParent = ({ Cmpnt: PageCmpnt }) => {
  const navigate = useNavigate();

  const eventListenerCallback = useCallback((e) => {
    if (e.data.eventType === PostMessageEvents.ROUTE_NAVIGATE) {
      navigate(e.data.path);
    }
  },
  [navigate]);

  useEffect(() => {
    // We react on onClick from Sidebar navigation since that is outside of the router component
    window.addEventListener('message', eventListenerCallback, true);

    // Unmount
    return () => window.removeEventListener('message', eventListenerCallback, true);
  }, [eventListenerCallback]);

  // All page components should be lazyloaded, thus we need Suspense
  return (
    <Suspense fallback={<Loading />}>
      <PageCmpnt />
    </Suspense>
  );
  // return <p>Hejsan</p>;
};

const router = createBrowserRouter(RouteData.map(({ element: Cmpnt, ...rest }: any) => ({
  ...rest,
  element: <RouteParent Cmpnt={Cmpnt} />,
})) as RouteObject[]);

const AppRoutes:FC = (): JSX.Element => (
  <RouterProvider router={router} />
);

export default AppRoutes;
