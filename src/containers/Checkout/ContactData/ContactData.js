import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import styles from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

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
                    placeholder: 'EIR Code'
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
                    required: true
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
                isValid: false
            },
        },
        formIsValid: false,
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault() //stops the form loading the page by sending a request
        this.setState({loading: true});
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier];
        }
        const order = {
            ingredients: this.props.ingredients, 
            price: this.props.price, //obviously don't rely on the client side price   
            orderData: formData
        }

        //comment out this post request to see the spinner for longer
        axios.post('/orders.json', order) //.json is needed to have firebase trigger correctly. Orders is a dynamic node
            .then(response => {
                this.setState({loading: false });
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({loading: false });
            });
    }

    checkValidity(value, rules){
        let isValid = true;

        if(!rules){
            return true;
        }

        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if(rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };

        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };

        updatedFormElement.value = event.target.value;
        console.log(updatedFormElement);

        updatedFormElement.isValid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;        
        
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for(let inputIdentifier in updatedOrderForm){
            formIsValid = updatedOrderForm[inputIdentifier].isValid && formIsValid;
        }
        console.log(formIsValid);
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid})
    }

    render (){
        const formElementArray = [];
        for (let key in this.state.orderForm){
            formElementArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let form = (  
                <form onSubmit={this.orderHandler}>
                    {formElementArray.map(formElement => (
                            <Input 
                                key={formElement.id}
                                elementType={formElement.config.elementType} 
                                elementConfig={formElement.config.elementConfig}
                                value={formElement.config.value}
                                inValid={!formElement.config.isValid}
                                shouldValidate={formElement.config.validation}
                                touched={formElement.config.touched}
                                changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
                    ))}
                    <Button btnType="Success" disabled={!this.state.formIsValid}>Order</Button>
                </form>     
            );
        if(this.state.loading){
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

export default ContactData;