import { useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Restaurants from '../restaurants';
import Header from '../header';
import Basket from '../basket';

import { UserProvider } from '../../contexts/user';
import Thankyou from '../thankyou';
import OrderError from '../orderError';
const App = () => {
  const [name, setName] = useState('Andrey');
  return (
    <div>
      <UserProvider value={{ name, setName }}>
        <Header />
        <Switch>
          <Route path="/checkout" component={Basket} />
          <Route path="/restaurants" component={Restaurants} />
          <Route path="/thankyou" component={Thankyou} />
          <Route path="/orderError" component={OrderError} />
          <Route path="/error" component={() => <p>Error Page!</p>} />
          <Redirect to="/restaurants" />
        </Switch>
      </UserProvider>
    </div>
  );
};

export default App;
