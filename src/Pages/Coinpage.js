import { LinearProgress, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import CoinInfo from '../Components/CoinInfo';
import { SingleCoin } from '../config/Api';
import { numberWithCommas } from '../Components/CoinsTable';
import { CryptoState } from '../CryptoContext';

// Styled components
const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const Sidebar = styled('div')(({ theme }) => ({
  width: '30%',
  [theme.breakpoints.down('md')]: {
    width: '100%',
  },
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: 25,
  borderRight: '2px solid grey',
}));

const Heading = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  marginBottom: 20,
  fontFamily: 'Montserrat',
}));

const Description = styled(Typography)(({ theme }) => ({
  width: '100%',
  fontFamily: 'Montserrat',
  padding: 25,
  paddingBottom: 15,
  paddingTop: 0,
  textAlign: 'justify',
}));

const MarketData = styled('div')(({ theme }) => ({
  alignSelf: 'start',
  padding: 25,
  paddingTop: 10,
  width: '100%',
  [theme.breakpoints.down('md')]: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  [theme.breakpoints.down('xs')]: {
    alignItems: 'start',
  },
}));

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();

  const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    try {
      const { data } = await axios.get(SingleCoin(id));
      setCoin(data);
    } catch (error) {
      console.error('Failed to fetch coin data:', error);
    }
  };

  useEffect(() => {
    fetchCoin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, currency]);

  if (!coin) return <LinearProgress style={{ backgroundColor: 'gold' }} />;

  return (
    <Container>
      <Sidebar>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Heading variant="h3">{coin?.name}</Heading>
        <Description variant="subtitle1">
          {ReactHtmlParser(coin?.description.en.split('. ')[0])}.
        </Description>
        <MarketData>
          <span style={{ display: 'flex' }}>
            <Heading variant="h5">Rank:</Heading>
            &nbsp; &nbsp;
            <Typography variant="h5" sx={{ fontFamily: 'Montserrat' }}>
              {numberWithCommas(coin?.market_cap_rank)}
            </Typography>
          </span>

          <span style={{ display: 'flex' }}>
            <Heading variant="h5">Current Price:</Heading>
            &nbsp; &nbsp;
            <Typography variant="h5" sx={{ fontFamily: 'Montserrat' }}>
              {symbol}{' '}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>
          <span style={{ display: 'flex' }}>
            <Heading variant="h5">Market Cap:</Heading>
            &nbsp; &nbsp;
            <Typography variant="h5" sx={{ fontFamily: 'Montserrat' }}>
              {symbol}{' '}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </span>
        </MarketData>
      </Sidebar>
      <CoinInfo coin={coin} />
    </Container>
  );
};

export default CoinPage;
