import React, {Component} from 'react';
import {connect} from 'react-redux';
import Button from '../../../components/UI/Button/Button';
import styles from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import { updateObject, checkValidity } from '../../../shared/utility';

class ContactData extends Component {    
    state = {
        orderForm: {
            name: { //this could just be an object but for demo purposes outlining each object. 
                elementType: 'input',
                //element config must use the default element attribute names if you go this way
                elementConfig: {
                    type: 'text', 
                    placeholder: 'Name'
                }, 
                value: '',
                validation: {
                    required: true
                }, 
                isValid: false, 
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text', 
                    placeholder: 'Street'
                }, 
                value: '',
                validation: {
                    required: true
                }, 
                isValid: false, 
                touched: false
            },
            eirCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text', 
                    placeholder: '7 Character EIR Code'
                }, 
                value: '',
                validation: {
                    required: true, 
                    minLength: 7, 
                    maxLength: 7
                }, 
                isValid: false, 
                touched: false
            },
            county: {
                elementType: 'input',
                elementConfig: {
                    type: 'text', 
                    placeholder: 'County'
                }, 
                value: '',
                validation: {
                    required: true
                }, 
                isValid: false, 
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email', 
                    placeholder: 'Email'
                }, 
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                }, 
                isValid: false, 
                touched: false
            },
            deliveryOption: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'standard', displayValue: 'Standard'}
                    ]
                }, 
                value: 'fastest', 
                validation: {},
                isValid: true
            },
        },
        formIsValid: false
        //loading: false
    }

    orderHandler = (event) => {
        event.preventDefault() //stops the form loading the page by sending a request
        //this.setState({loading: true});
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier];
        };
        const order = {
            ingredients: this.props.ings, 
            price: this.props.price, //obviously don't rely on the client side price   
            orderData: formData,
            userId: this.props.userId
        };
        this.props.onOrderBurger(order, this.props.token);

        //comment out this post request to see the spinner for longer
        //moved to action file
        // axios.post('/orders.json', order) //.json is needed to have firebase trigger correctly. Orders is a dynamic node
        //     .then(response => {
        //         this.setState({loading: false });
        //         this.props.history.push('/');
        //     })
        //     .catch(error => {
        //         this.setState({loading: false });
        //     });
    }

    inputChangedHandler = (event, inputIdentifier) => {

        // const updatedOrderForm = {
        //     ...this.state.orderForm
        // };
        // const updatedFormElement = {
        //     ...updatedOrderForm[inputIdentifier]
        // };
        console.log(this.state.orderForm[inputIdentifier]);
        const updatedFormElement = updateObject(this.state.orderForm[inputIdentifier], {
            value: event.target.value,
            isValid: checkValidity(event.target.value, this.state.orderForm[inputIdentifier].validation),
            touched: true
        });
        const updatedOrderForm = updateObject(this.state.orderForm, {
            [inputIdentifier]: updatedFormElement
        });

        // updatedFormElement.value = event.target.value;
        // console.log(updatedFormElement);
        // updatedFormElement.isValid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        // updatedFormElement.touched = true;   
        //updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for(let inputIdentifier in updatedOrderForm){
            formIsValid = updatedOrderForm[inputIdentifier].isValid && formIsValid;
        }
        //console.log(formIsValid);
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid})
    }

    render (){
        const formElementArray = [];
        for (let key in this.state.orderForm){
            formElementArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        let form = (  
                <form onSubmit={this.orderHandler}>
                    {formElementArray.map(formElement => (
                            <Input 
                                key={formElement.id}
                                elementType={formElement.config.elementType} 
                                elementConfig={formElement.config.elementConfig}
                                value={formElement.config.value}
                                isValid={!formElement.config.isValid}
                                shouldValidate={formElement.config.validation}
                                touched={formElement.config.touched}
                                changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
                    ))}
                    <Button btnType="Success" disabled={!this.state.formIsValid}>Order</Button>
                </form>     
            );
        if(this.props.loading){
            form = <Spinner />
        }
        return (
            <div className={styles.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice, 
        loading: state.order.loading, 
        token: state.auth.token,
        userId: state.auth.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));