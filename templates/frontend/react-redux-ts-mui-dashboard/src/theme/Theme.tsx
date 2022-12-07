import type { FC } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
// import { deepOrange, amber, grey } from '@mui/material/colors';
import DarkTheme from './schemes/DarkTheme';
import LightTheme from './schemes/LightTheme';

// const getDesignTokens = (mode: 'light'|'dark') => ({
//   palette: {
//     mode,
//     ...(mode === 'light'
//       ? {
//         // palette values for light mode
//         primary: amber,
//         divider: amber[200],
//         text: {
//           primary: grey[900],
//           secondary: grey[800],
//         },
//       }
//       : {
//         // palette values for dark mode
//         primary: deepOrange,
//         divider: deepOrange[700],
//         background: {
//           default: deepOrange[900],
//           paper: deepOrange[900],
//         },
//         text: {
//           primary: '#fff',
//           secondary: grey[500],
//         },
//       }),
//   },
// });

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
