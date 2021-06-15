import { useState } from 'react';
import Restaurants from '../restaurants';
import Header from '../header';

import { UserProvider } from '../../context/user';
import { CurrentCurrencyProvider, currencies } from '../internal-price-manager/internal-price-manager';

const App = () => {
  const [name, setName] = useState('Andrey');
  const [currentCurrency, setCurrentCurrency] = useState(Object.keys(currencies)[0]);
  return (
    <div>
      <UserProvider value={{ name, setName }}>
        <CurrentCurrencyProvider value={{ currentCurrency, setCurrentCurrency }}>
          <Header />
          <Restaurants />
        </CurrentCurrencyProvider>
      </UserProvider>
    </div>
  );
};

export default App;
