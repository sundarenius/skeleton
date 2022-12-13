import type { FC } from 'react';
import { CircularProgress, Box } from '@mui/material';

interface Props {
  text?: string
}

const Loading:FC<Props> = ({ text }): JSX.Element => (
  <Box sx={{
    display: 'flex',
    height: '100vh',
    width: '100vw',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  }}
  >
    <CircularProgress size={60} style={{ marginTop: '-15%' }} />
    <p style={{ marginTop: '40px' }}>{text || 'Loading ...'}</p>
  </Box>
);

export default Loading;
