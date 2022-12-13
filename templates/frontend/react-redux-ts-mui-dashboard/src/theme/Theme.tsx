import type { FC } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import DarkTheme from './schemes/DarkTheme';
import LightTheme from './schemes/LightTheme';

const theme = (themeMode) => createTheme(themeMode === 'dark' ? DarkTheme : LightTheme as any);

interface Props {
  children?: JSX.Element,
  themeMode: 'light'|'dark'
}

const Theme:FC<Props> = ({ children, themeMode }): JSX.Element => (
  <ThemeProvider theme={theme(themeMode)}>
    {children}
  </ThemeProvider>
);

export default Theme;
