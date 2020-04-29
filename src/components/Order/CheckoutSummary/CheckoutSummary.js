import React from 'react';
import Button from '../../UI/Button/Button';
import Burger from '../../Burger/Burger';
import styles from './CheckoutSummary.module.css';

const checkoutSummary = (props) => {
    console.log('[CheckoutSummary]');
    console.log(props);
    return(
        <div className={styles.CheckoutSummary}>
            <h1>Are You Happy With Your Burger?</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button 
                btnType="Danger"
                clicked={props.checkoutCancelled}>CANCEL</Button>
            <Button
                btnType="Success"
                clicked={props.checkoutContinued}>CONTINUE</Button>
        </div>
    );
}

export default checkoutSummary