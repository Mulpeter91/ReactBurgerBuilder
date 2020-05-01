import React, { Component } from "react";
import Auxiliary from '../../hoc/Auxiliary/Auxiliary.js'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls.js';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../../src/axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index'; //if you point at a folder with no file it will automatically look for 'index.js'

// const INGREDIENT_PRICES = {
//     salad: 0.5, 
//     cheese: 1.0, 
//     meat: 2.0, 
//     bacon: 1.5
// }

class BurgerBuilder extends Component {
    // constructor(){
    //     super(props);
    //     this.state = {...}
    // }

    state = {
        //ingredients: null,
        //totalPrice: 2, 
        //purchaseable: false, 
        purchasing: false
        // loading: false, 
        // error: false
    }

    componentDidMount () {
        // axios.get('https://udemy-react-burger-build-f3632.firebaseio.com/ingredients.json')
        //     .then(response => {
        //         this.setState({ingredients: response.data});
        //     })
        //     .catch(error => {
        //         this.setState({error: true});
        //     });
        this.props.onInitIngredients();
    }

    updatePurchaseState (ingredients) {
             const sum = Object.keys(ingredients)
            .map(key => {
                return ingredients[key];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        //this.setState({purchaseable: sum > 0});
        return sum > 0;
    }

    // addIngredientHandler = type => {
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount = oldCount + 1;
    //     //creates a new object
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     }

    //     updatedIngredients[type] = updatedCount;
    //     const priceAddition = INGREDIENT_PRICES[type]
    //     const oldPrice = this.state.totalPrice; 
    //     const newPrice = oldPrice + priceAddition; 
    //     this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    //     this.updatePurchaseState(updatedIngredients);
    // }

    // removeIngredientHandler = type => {
    //     const oldCount = this.state.ingredients[type];

    //     if(oldCount <= 0) {
    //         return;
    //     }

    //     const updatedCount = oldCount - 1;
    //     //creates a new object
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     }

    //     updatedIngredients[type] = updatedCount;
    //     const priceDeduction = INGREDIENT_PRICES[type]
    //     const oldPrice = this.state.totalPrice; 
    //     const newPrice = oldPrice - priceDeduction; 
    //     this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    //     this.updatePurchaseState(updatedIngredients);
    // }

    purchaseHander = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        // alert('you continue');     

        //REMOVED PUSHING QUERY PARAMS AS PART OF REDUX IMPROVMENT: can get from store
        // const queryParams = [];
        // for (let i in this.state.ingredients){
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        // }
        // queryParams.push('price=' + this.state.totalPrice);
        // const queryString = queryParams.join('&');
        // this.props.history.push({
        //     pathname: '/checkout', 
        //     search: '?' + queryString
        // });
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }

    render(){   
        
        const disabledInfo = {
            ...this.props.ings
        };

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        // {salad: true, meat: false, ...}

        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients can not be loaded</p> : <Spinner />

        //console.log('[Burger Builder] tracking ings');
        //console.log(this.props.ings);

        if(this.props.ings){
            burger =  (
                <Auxiliary>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls 
                        ingredientAdded={this.props.onIngredientAdded} //was referencing the onIngredientHandler method before Redux 
                        ingredientRemoved={this.props.onIngredientRemoved}
                        purchaseable={this.updatePurchaseState(this.props.ings)}
                        disabled={disabledInfo} 
                        ordered={this.purchaseHander}
                        price={this.props.price}/>
                </Auxiliary>);
            orderSummary =  <OrderSummary 
                ingredients={this.props.ings} 
                purchaseCanceled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                price={this.props.price}/>;
        }

        // if(this.state.loading) {
        //     orderSummary = <Spinner />
        // }

        return (
            <Auxiliary>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
               {burger}
            </Auxiliary>
        );   
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients, 
        price: state.burgerBuilder.totalPrice, 
        error: state.burgerBuilder.error
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)), 
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));