/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';

import { storiesOf, setAddon } from '@storybook/react';
import JSXAddon from 'storybook-addon-jsx';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';

import SignupForm from '../components/SignupForm';

setAddon(JSXAddon);

storiesOf('SignupForm', module)
  .addDecorator(withKnobs)
  .addWithJSX('dynamic props', () => {
    const loading = boolean('loading');
    const errorMessage = text('errorMessage');

    return (
      <SignupForm
        loading={loading}
        errorMessage={errorMessage}
        onSubmit={action('submit')}
      />
    );
  });
