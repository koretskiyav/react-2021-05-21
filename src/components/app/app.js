import { useState } from 'react';
import Restaurants from '../restaurants';
import Header from '../header';

import { UserProvider } from '../../context/user';
import { CurrencyProvider } from '../../context/currency';
const App = () => {
  const [name, setName] = useState('Andrey');
  const [currency, setCurency] = useState('US');

  return (
    <div>
      <UserProvider value={{ name, setName }}>
        <CurrencyProvider value={{ currency, setCurency }}>
          <Header />
          <Restaurants />
        </CurrencyProvider>
      </UserProvider>
    </div>
  );
};

export default App;
