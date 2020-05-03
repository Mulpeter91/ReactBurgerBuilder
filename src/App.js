import React from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import { Route, Switch } from 'react-router-dom';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';

function App() {
  return (
    <div>
     <Layout>
       <Switch>         
        <Route path="/Checkout" component={Checkout} />
        <Route path="/Orders" component={Orders} />        
        <Route path="/Logout" component={Logout} />
        <Route path="/Auth" component={Auth} />
        <Route path="/" component={BurgerBuilder} />
       </Switch>
     </Layout>
    </div>
  );
}

export default App;
