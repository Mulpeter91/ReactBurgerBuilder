import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';
//import * as actions from '../../store/actions/index';

class Checkout extends Component {
    // state = {
    //     ingredients: null,
    //     totalPrice: 0
    // }

    //before we render the child component
    //REMOVED AS PART OF REDUX. NO LONGER PASSING QUERY STRINGS
    // componentWillMount() {
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingredients = {};
    //     let price = 0;
    //     for(let param of query.entries()){
    //         if(param[0] === 'price'){
    //             price = +param[1];
    //         } else {
    //             //['salad', '1']
    //             ingredients[param[0]] = +param[1];
    //         }          
    //     }
    //     this.setState({ingredients: ingredients, totalPrice: price});
    // }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact');
    }

    render() {
        let summary = <Redirect to="/" />
        //console.log("[Checkout Render]");
        if(this.props.ings) {            
            const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null
            //console.log("[Checkout Render: Purchase Redirect]", purchasedRedirect); 
            summary = (
                <div>
                {purchasedRedirect}    
                <CheckoutSummary 
                    ingredients={this.props.ings}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}/>
                    <Route 
                    path={this.props.match.url + '/contact'} 
                    //render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props}/>)}
                    component={ContactData}/>
                </div>
            )
        }
        //console.log("[Checkout Render: Summary]", summary);
        return (
            <div>
                {summary}              
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
};

export default connect(mapStateToProps)(Checkout);