import type { FC } from 'react';
import { CircularProgress, Box } from '@mui/material';

interface Props {
  text?: string
}

const Loading:FC<Props> = ({ text }): JSX.Element => (
  <Box id="loading-container" sx={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: '30%',
  }}
  >
    <CircularProgress size={40} />
    <p style={{ marginTop: '40px' }}>{text || 'Loading ...'}</p>
  </Box>
);

export default Loading;
