import React from 'react';
import { Grid } from 'semantic-ui-react';
import './Start.css';

const Start = () => (
  <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
    <Grid.Column style={{ maxWidth: 300 }}>
      <div className="sk-fading-circle">
        <div className="sk-circle1 sk-circle" />
        <div className="sk-circle2 sk-circle" />
        <div className="sk-circle3 sk-circle" />
        <div className="sk-circle4 sk-circle" />
        <div className="sk-circle5 sk-circle" />
        <div className="sk-circle6 sk-circle" />
        <div className="sk-circle7 sk-circle" />
        <div className="sk-circle8 sk-circle" />
        <div className="sk-circle9 sk-circle" />
        <div className="sk-circle10 sk-circle" />
        <div className="sk-circle11 sk-circle" />
        <div className="sk-circle12 sk-circle" />
      </div>
      Loading...
    </Grid.Column>
  </Grid>
);

export default Start;
