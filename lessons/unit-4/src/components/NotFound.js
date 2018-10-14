import React from 'react';
import { Link } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import urls from '../urls';

const NotFound = () => (
  <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
    <Grid.Column style={{ maxWidth: 300 }}>
      Ops !!! There is nothing to see here <span role="img" aria-label="emoji">🤔</span>. <br />
      Go to <Link to={urls.HOME}> Home</Link>
    </Grid.Column>
  </Grid>
);

export default NotFound;
