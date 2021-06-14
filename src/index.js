import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';

import App from './components/app';
import { CurrencyProvider } from './context/currency';

import store from './redux/store';

// DEV ONLY!!!
window.store = store;

ReactDOM.render(
  <Provider store={store}>
    <CurrencyProvider>
      <App />
    </CurrencyProvider>
  </Provider>,
  document.getElementById('root')
);
