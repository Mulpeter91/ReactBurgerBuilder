import React, {Component} from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import { Route, Switch, withRouter } from 'react-router-dom';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import {connect} from 'react-redux';
import * as actions from './store/actions/index';

class App extends Component {

  componentDidMount () {
    this.props.onTryAutoSignup();
  }

  render () {
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
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(null, mapDispatchToProps)(App));
