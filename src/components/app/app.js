import { useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Restaurants from '../restaurants';
import { getRestaurantsPath } from '../restaurants/restaurants';
import Header from '../header';
import Basket from '../basket';

import { UserProvider } from '../../contexts/user';
const App = () => {
  const [name, setName] = useState('Andrey');
  return (
    <div>
      <UserProvider value={{ name, setName }}>
        <Header />
        <Switch>
          <Route path="/checkout" component={Basket} />
          <Route path={getRestaurantsPath()} component={Restaurants} />
          <Route path="/error" component={() => <p>Error Page!</p>} />
          <Redirect to={getRestaurantsPath()} />
          <Route path="/" component={() => <p>404 - Not Found :(</p>} />
        </Switch>
      </UserProvider>
    </div>
  );
};

export default App;
