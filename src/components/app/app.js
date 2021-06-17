import { useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Restaurants from '../restaurants';
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
          <Route path="/restaurants" component={Restaurants} />
          <Route path="/error" component={() => <p>Error Page!</p>} />
          <Route path="/basket-error">
            {({ history }) => <p>{`${history.location.state}`}</p>}
          </Route>
          <Route
            path="/thank-you"
            component={() => <p>Thank you for order!</p>}
          />
          <Redirect to={`/restaurants`} />
        </Switch>
      </UserProvider>
    </div>
  );
};

export default App;
