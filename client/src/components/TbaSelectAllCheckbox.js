import React from 'react';
import Checkbox from '@mui/material/Checkbox';

function TbaSelectAllCheckbox({ isChecked, onToggle }) {
  return (
    <Checkbox
      checked={isChecked}
      onChange={onToggle}
      inputProps={{ 'aria-label': 'select all items' }}
    />
  );
}

export default TbaSelectAllCheckbox;