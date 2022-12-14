import type { FC } from 'react';
import {
  Box,
  Paper,
} from '@mui/material';

interface Props {
  children,
}

const BlockContainer:FC<Props> = ({ children }): JSX.Element => (
  <div id="block-container">
    <Box
      sx={{
        display: 'flex',
        '& > :not(style)': {
          m: 1,
          width: '100%',
          padding: '20px',
        },
      }}
    >
      <Paper variant="outlined">
        { children }
      </Paper>
    </Box>
  </div>
);

export default BlockContainer;
