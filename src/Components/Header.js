import React from 'react';
import {
  AppBar,
  Container,
  MenuItem,
  Select,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
} from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { CryptoState } from '../CryptoContext';

// Styled component for title
const Title = styled(Typography)(({ theme }) => ({
  flex: 1,
  color: 'gold',
  fontFamily: 'Montserrat',
  fontWeight: 'bold',
  cursor: 'pointer',
}));

const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#fff',
    },
    mode: 'dark',
  },
});

const Header = () => {
  const navigate = useNavigate();
  const { currency, setCurrency } = CryptoState();
  
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color='transparent' position='static'>
        <Container>
          <Toolbar>
            <Title onClick={() => navigate('/')} variant='h6'>
               Crypto Explorer
            </Title>
            <Select
              variant='outlined'
              sx={{
                width: 100,
                height: 40,
                marginRight: 15,
              }}
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value='USD'>USD</MenuItem>
              <MenuItem value='INR'>INR</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
