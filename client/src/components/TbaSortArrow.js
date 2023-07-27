import React from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

const TbaSortArrow = ({ sortBy, currentSortBy, sortDirection }) => {
  if (sortBy !== currentSortBy) {
    return null; 
  }

  return sortDirection === 'asc' ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />;
};

export default TbaSortArrow;
