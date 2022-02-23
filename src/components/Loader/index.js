import React, { memo } from 'react';
import {
  CircularProgress
} from '@material-ui/core';

const Loader = () => {
  return (
    <div style={{ display: 'flex', width: '100%', marginTop: '15%', justifyContent: 'center' }}>
      <CircularProgress disableShrink />
    </div>
  )
}

export default memo(Loader);

