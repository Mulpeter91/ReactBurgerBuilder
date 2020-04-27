import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import styles from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    state = {
        name: '', 
        email: '', 
        address: {
            street: '',
            postalCode: ''
        }, 
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault() //stops the form loading the page by sending a request
        console.log('ingredients');
        console.log(this.props.ingredients);
        console.log('totalPrice');
        console.log(this.props.price);
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients, 
            price: this.props.price, //obviously don't rely on the client side price
            customer: {
                name: 'Rob Mulpeter', 
                address : {
                    street: 'Test 1', 
                    code: 'Code X', 
                    country: 'France'
                }, 
                email: 'email@gmail.com'
            }, 
            deliveryOption: 'fastest'
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

    render (){
        let form = (  
                <form>
                    <input className={styles.Input} type="email" name="email" placeholder="Email" />
                    <input className={styles.Input} type="text" name="street" placeholder="Street" />
                    <input className={styles.Input} type="text" name="postal" placeholder="Postal Code" />
                    <input className={styles.Input} type="text" name="name" placeholder=" Name" />
                    <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
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