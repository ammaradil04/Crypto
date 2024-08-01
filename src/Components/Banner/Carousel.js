import { makeStyles } from '@material-ui/core';  // Ensure correct import path for styles
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { TrendingCoins } from '../../config/Api';
import { CryptoState } from '../../CryptoContext';
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  carousel: {
    height: '50%',
    display: 'flex',
    alignItems: 'center',
  },
  carouselItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    cursor: 'pointer',
    textTransform: 'uppercase',
    color: 'white',
  },
}));

const Carousel = () => {
  const classes = useStyles();
  const [trending, setTrending] = useState([]);
  const { currency } = CryptoState();

  const fetchTrendingCoins = async () => {
    try {
      const { data } = await axios.get(TrendingCoins(currency));
      setTrending(data);
    } catch (error) {
      console.error('Failed to fetch trending coins:', error);
    }
  };

  useEffect(() => {
    fetchTrendingCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  const items = trending.map((coin) => (
    <Link className={classes.carouselItem} to={`/coins/${coin.id}`} key={coin.id}>
      <img
        src={coin?.image}
        alt={coin.name}
        height="80"
        style={{ marginBottom: 10 }}
      />
      <span>{coin.name}</span>
    </Link>
  ));

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  return (
    <div className={classes.carousel}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        responsive={responsive}
        autoPlay
        disableButtonsControls
        items={items}
      />
    </div>
  );
};

export default Carousel;
