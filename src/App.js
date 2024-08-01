import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './Components/Header';
import Homepage from './Pages/Homepage';
import Coinpage from './Pages/Coinpage';
import { styled } from '@mui/material/styles';

// Define your styles using styled
const AppContainer = styled('div')(({ theme }) => ({
  backgroundColor: '#14161a',
  color: 'white',
  minHeight: '100vh',
}));

function App() {
  return (
    <BrowserRouter>
      <AppContainer>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/coins/:id" element={<Coinpage />} />
        </Routes>
      </AppContainer>
    </BrowserRouter>
  );
}

export default App;
