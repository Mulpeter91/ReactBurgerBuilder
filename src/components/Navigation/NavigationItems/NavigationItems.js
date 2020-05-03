import React from 'react';
import styles from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
import external from './NavigationItem/NavigationItem.module.css'; //importing this just to have the anchor tag look the same

const navigationItems = (props) => (
    <ul className={styles.NavigationItems}> 
        <NavigationItem link="/">
            Burger Builder
        </NavigationItem>
        {props.isAuthenticated ? <NavigationItem link="/Orders">Orders</NavigationItem> : null }
        { !props.isAuthenticated 
            ?  <NavigationItem link="/Auth">Login</NavigationItem>
            :  <NavigationItem link="/Logout">Logout</NavigationItem>
        }        
        <li className={external.NavigationItem}>
            <a href="https://github.com/Mulpeter91/ReactBurgerBuilder" target="_blank" rel="noopener noreferrer">
                Source Code
            </a>
        </li>
    </ul>
);

export default navigationItems;