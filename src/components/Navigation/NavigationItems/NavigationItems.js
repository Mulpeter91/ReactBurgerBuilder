import React from 'react';
import styles from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => (
    <ul className={styles.NavigationItems}> 
        <NavigationItem link="/">
            Burger Builder
        </NavigationItem>
        <NavigationItem link="/Orders">
            Orders
        </NavigationItem>
        <NavigationItem link="/Auth">
            Authenticate
        </NavigationItem>
    </ul>
);

export default navigationItems;