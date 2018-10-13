/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';

import { storiesOf, setAddon } from '@storybook/react';
import JSXAddon from 'storybook-addon-jsx';

import SignupForm from '../components/SignupForm';

setAddon(JSXAddon);

storiesOf('SignupForm', module)
  .addWithJSX('default', () => <SignupForm />);
