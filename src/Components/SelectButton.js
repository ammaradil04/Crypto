import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  selectButton: {
    border: '1px solid gold',
    borderRadius: 5,
    padding: '10px 20px',
    fontFamily: 'Montserrat',
    cursor: 'pointer',
    backgroundColor: (props) => (props.selected ? 'gold' : 'transparent'),
    color: (props) => (props.selected ? 'black' : 'inherit'),
    fontWeight: (props) => (props.selected ? 700 : 500),
    '&:hover': {
      backgroundColor: 'gold',
      color: 'black',
    },
    width: '22%',
  },
});

const SelectButton = ({ children, selected, onClick }) => {
  const classes = useStyles({ selected });

  return (
    <span onClick={onClick} className={classes.selectButton}>
      {children}
    </span>
  );
};

export default SelectButton;
