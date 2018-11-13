/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf, setAddon } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean } from '@storybook/addon-knobs/react';
import JSXAddon from 'storybook-addon-jsx';

import { BrowserRouter } from 'react-router-dom';
import { createCardData } from './utils';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';
import Timeline, { Card } from '../components/Timeline';
import NavigationBar from '../components/NavigationBar';

setAddon(JSXAddon);

storiesOf('component LoginForm', module)
  .addDecorator(withKnobs)
  .addWithJSX('with dynamic variables', () => {
    const loading = boolean('Loading', false);
    const errorMessage = text('Error message', '');

    return (
      <BrowserRouter>
        <LoginForm
          loading={loading}
          errorMessage={errorMessage}
          onSubmit={action('submit')}
        />
      </BrowserRouter>
    );
  });

storiesOf('component SignupForm', module)
  .addDecorator(withKnobs)
  .addWithJSX('with dynamic variables', () => {
    const loading = boolean('Loading', false);
    const errorMessage = text('Error message', '');

    return (
      <BrowserRouter>
        <SignupForm
          loading={loading}
          errorMessage={errorMessage}
          onSubmit={action('submit')}
        />
      </BrowserRouter>
    );
  });

storiesOf('component Card', module)
  .addWithJSX('default', () => {
    const data = createCardData();

    return <Card spark={data} style={{}} />;
  });

storiesOf('component Timeline', module)
  .addDecorator(withKnobs)
  .addWithJSX('with dynamic variables', () => {
    const data = new Array(10);
    data.fill(createCardData());
    const loading = boolean('Loading', false);

    return <Timeline data={data} loading={loading} />;
  });

storiesOf('component NavigationBar', module)
  .addDecorator(withKnobs)
  .addWithJSX('default', () => <NavigationBar />);
