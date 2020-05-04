import React, { Component } from 'react';
import axios from '../../axios-orders';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import styles from './Orders.module.css';
import YouTube from 'react-youtube';

class Orders extends Component {
    // state = {
    //     orders: [],
    //     loading: true
    // }

    componentDidMount() {
         this.props.onFetchOrders(this.props.token, this.props.userId);
    }

    render () {

        const videoOptions = {
            height: '390',
            width: '640',
            playerVars: {
              // https://developers.google.com/youtube/player_parameters
              autoplay: 1,
            },
          };


        let orders = <Spinner />;

        if(!this.props.loading){
            orders = this.props.orders.map(order => (
                    <Order 
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price}/>
                )
            ) 
        }
        if(orders.length <= 0){
            orders = (
                <div className={styles.Placeholder}>
                    <h2>You Still Haven't Ordered Anything Yet?!</h2>
                    <h1 className={styles.Red}>PUT BURGERS IN YOUR BODY, NERD!</h1>
                </div>
            );
        }
        return (
            <div>    
                <div style={{textAlign: 'center', backgroundColor: 'black'}}>
                    <YouTube videoId="rrlQhklDjIs" opts={videoOptions}/>
                </div> 
                {orders}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders, 
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios)); 