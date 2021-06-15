import { useState } from 'react';
import Restaurants from '../restaurants';
import Header from '../header';

import { UserProvider } from '../../context/user';
import { PriceProvider } from '../../context/price';
const App = () => {
  const [name, setName] = useState('Andrey');
  return (
    <div>
      <UserProvider value={{ name, setName }}>
        <PriceProvider>
          <Header />
          <Restaurants />
        </PriceProvider>
      </UserProvider>
    </div>
  );
};

export default App;
