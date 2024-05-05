import React from 'react';
import { NetworkPingTwoTone as DeleteIcon } from '@mui/icons-material';
import { Button } from '@mui/material';

interface Props {
  onClick: () => void;
}

export const SendPing = ({ onClick }: Props) => {
  return (
    <Button
      color="error"
      size="small"
      variant="outlined"
      startIcon={<DeleteIcon color="error" />}
      onClick={onClick}
    >
      Send Request
    </Button>
  );
};
