import { configure } from '@storybook/react';

import 'semantic-ui-css/semantic.min.css';
import '../src/globalStyles';

function loadStories() {
  require('../src/stories');
}

configure(loadStories, module);
