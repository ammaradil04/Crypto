import React from 'react';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

const SelectButton = styled(Typography)(({ theme, selected }) => ({
  border: '1px solid gold',
  borderRadius: 5,
  padding: '10px 20px',
  fontFamily: 'Montserrat',
  cursor: 'pointer',
  backgroundColor: selected ? 'gold' : 'transparent',
  color: selected ? 'black' : 'inherit',
  fontWeight: selected ? 700 : 500,
  '&:hover': {
    backgroundColor: 'gold',
    color: 'black',
  },
  width: '22%',
  textAlign: 'center',
}));

const SelectButtonComponent = ({ children, selected, onClick }) => {
  return (
    <SelectButton
      onClick={onClick}
      selected={selected}
      variant="body2"  // Optional: adjust typography variant as needed
    >
      {children}
    </SelectButton>
  );
};

export default SelectButtonComponent;
