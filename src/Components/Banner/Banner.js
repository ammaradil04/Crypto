import { Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import Carousel from './Carousel';

// Define your styles using styled
const BannerContainer = styled('div')({
  backgroundImage: "url(./banner2.jpg)",
  height: '400px',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  display: 'flex',
  alignItems: 'center',
});

const BannerContent = styled(Container)({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  paddingTop: '25px',
  justifyContent: 'space-around',
});

const Tagline = styled('div')({
  display: 'flex',
  height: '40%',
  flexDirection: 'column',
  justifyContent: 'center',
  textAlign: 'center',
  color: 'white',
});

const Banner = () => {
  return (
    <BannerContainer>
      <BannerContent>
        <Tagline>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 'bold',
              mb: 2,
              fontFamily: 'Montserrat',
            }}
          >
            Crypto Hunter
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{
              color: 'darkgrey',
              textTransform: 'capitalize',
              fontFamily: 'Montserrat',
            }}
          >
            Get all the info regarding Crypto
          </Typography>
        </Tagline>
        <Carousel />
      </BannerContent>
    </BannerContainer>
  );
};

export default Banner;
