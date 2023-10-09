'use client'
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { initAuth } from '@/utils/helpers';
import Loading from '@/components/loading';

const Home = () => {
  const [isAuth, setIsAuth] = useState(false as boolean);

  useEffect(() => {
    initAuth(setIsAuth);
  }, []);

  return !isAuth ? <Loading /> : (
    <>
      <p>Main landing page</p>
      <Button variant="contained">Contained MUI button</Button>
    </>
  )
}

export default Home;
