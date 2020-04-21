import React from 'react';
import burgerLogo from '../../assets/Images/burger-logo.png';
import styles from './Logo.module.css';

const logo = props => (
    <div className={styles.Logo} style={{height: props.height, marginBottom: props.marginBottom}}>
        <img src={burgerLogo} alt="Bob's Burgers"/>
    </div>
);

export default logo;