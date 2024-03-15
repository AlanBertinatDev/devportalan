import { Typography } from '@mui/material';
import React from 'react';
import '../styles/AboutMe.css';

const AboutMe = () => {
  return (
    <div>
      <Typography className="custom-heading"
        sx={{
          fontFamily: 'Cousine',
          fontSize: '55px',
          color: 'white',
        }}
      >
        Hey, soy Alan Bertinat.
      </Typography>
      <Typography className="custom-subheading"
        sx={{
          fontFamily: 'Cousine',
          fontSize: '35px',
          color: 'yellow',
        }}
      >
        Desarrollador full stack
      </Typography>
    </div>
  );
};

export default AboutMe;
