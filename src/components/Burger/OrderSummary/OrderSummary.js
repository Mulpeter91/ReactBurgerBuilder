import React, { Component } from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

class Summary extends Component {

    //This could be a functional component, doesn't have to be a class
    // componentWillUpdate () {
    //     //console.log('[Summary] will update');
    // } 

    render () {
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(key => {
            return (
            <li key={key}>
                <span style={{textTransform: 'capitalize'}}>{key}</span>: {this.props.ingredients[key]}
            </li>
            )
        });   

    return(
        <Aux>
            <h3>
                Your 
            </h3>
            <p>
                A declicious burger with the following ingredients:
            </p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: $ {this.props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clicked={this.props.purchaseCanceled}>CANCEL</Button>
            <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
        </Aux>
        );
    }
}

export default Summary;