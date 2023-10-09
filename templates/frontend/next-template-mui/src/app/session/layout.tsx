'use client'
import { useEffect, useState } from "react";
import { initAuth } from "@/utils/helpers";
import Loading from '@/components/loading';
import Header from '@/components/Header';
import LeftDrawer from '@/components/LeftDrawer';
import RightDrawer from '@/components/RightDrawer';
import { store } from '@/redux/store';
import { Provider as ReduxProvider } from 'react-redux';

export default function SessionLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isAuth, setIsAuth] = useState(false as boolean);

  useEffect(() => {
    initAuth(setIsAuth);
  }, []);

  return !isAuth ? <Loading /> : (
    <ReduxProvider store={store}>
      <Header />
      <LeftDrawer content={children} />
      <RightDrawer />
    </ ReduxProvider>
  );
}
