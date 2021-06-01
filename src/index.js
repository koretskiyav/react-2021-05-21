import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'normalize.css'; 
import App from './components/app/app.js';

import { restaurants } from './fixtures';

ReactDOM.render(
  <App restaurants={restaurants} />,
  document.getElementById('root')
);
