import { useState } from 'react';
import Restaurants from '../restaurants';
import Header from '../header';

import { UserProvider } from '../../context/user';
const App = () => {
  const [name, setName] = useState('Andrey');
  return (
    <div>
      <UserProvider value={{ name, setName }}>
        <Header />
        <Restaurants />
      </UserProvider>
    </div>
  );
};

export default App;
