import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { HistoricalChart } from '../config/Api';
import { Line } from 'react-chartjs-2';
import { CircularProgress, createTheme, ThemeProvider, Typography, Box } from '@mui/material';
import SelectButton from './SelectButton';
import { chartDays } from '../config/Data';
import { CryptoState } from '../CryptoContext';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#fff',
    },
    mode: 'dark',
  },
});

const CoinInfo = ({ coin }) => {
  const [historicData, setHistoricData] = useState([]);
  const [days, setDays] = useState(1);
  const { currency } = CryptoState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchHistoricData = async () => {
    setLoading(true);
    setError(null);  // Reset the error state
    try {
      const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
      setHistoricData(data.prices);
    } catch (error) {
      console.error('Error fetching historical data:', error);
      if (error.response) {
        // Server responded with a status other than 200 range
        setError(`Error: ${error.response.status} - ${error.response.data.message}`);
      } else if (error.request) {
        // No response received from the server
        setError('Network error: No response from the server.');
      } else {
        // Something else caused the error
        setError(`Error: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistoricData();
  }, [days, currency, coin.id]);

  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        sx={{
          width: '75%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 2.5,
          padding: 5,
          '@media (max-width: 900px)': {
            width: '100%',
            marginTop: 0,
            padding: 2.5,
            paddingTop: 0,
          },
        }}
      >
        {loading ? (
          <CircularProgress sx={{ color: 'gold', size: 250, thickness: 1 }} />
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <>
            <Line
              data={{
                labels: historicData.map((coin) => {
                  let date = new Date(coin[0]);
                  let time = date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),
                datasets: [
                  {
                    data: historicData.map((coin) => coin[1]),
                    label: `Price (Past ${days} Days) in ${currency}`,
                    borderColor: '#EEBC1D',
                  },
                ],
              }}
              options={{
                scales: {
                  x: {
                    type: 'category',
                    title: {
                      display: true,
                      text: 'Date',
                    },
                  },
                  y: {
                    type: 'linear',
                    title: {
                      display: true,
                      text: 'Price',
                    },
                  },
                },
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
            <Box
              sx={{
                display: 'flex',
                marginTop: 2.5,
                justifyContent: 'space-around',
                width: '100%',
              }}
            >
              {chartDays.map((day) => (
                <SelectButton
                  key={day.value}
                  onClick={() => {
                    setDays(day.value);
                    setLoading(true);
                  }}
                  selected={day.value === days}
                >
                  {day.label}
                </SelectButton>
              ))}
            </Box>
          </>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default CoinInfo;
