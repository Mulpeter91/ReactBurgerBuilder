import React from 'react';
import Styles from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import { withRouter } from 'react-router-dom'; //this is higher order component that will pass down the router props
import paunchLogo from '../../assets/Images/paunch-burger-logo.png';

const burger = props => {
    // console.log('[Burger] tracking ingredients');
    // console.log(props.ingredients);
    //We need to convert the ingredients OBJECT to an two length ARRAY of ingredient and quantity [key, value]  
    //First we can log the keys output to the console:  
    //console.log('[Burger.js] Keys Array: ' + Object.keys(props.ingredients));    
    //Then we assign those keys to a variable
    let transformedIngredients = Object.keys(props.ingredients).map(ingredientKey => {
          //We can then log the indivial key in the loop
          //console.log('[Burger.js] key:' + ingredientKey);
          //and see how the new Array length is set by passing in the props.ingredients[ingredientsKey]
          //console.log('Number of occurances:' + props.ingredients[ingredientKey]);
          return [...Array(props.ingredients[ingredientKey])].map((_, i) => {
            //console.log('Occurance: ' + (i + 1));
            return <BurgerIngredient key={ingredientKey + i} type={ingredientKey} />
        });        
    }) //reduce transforms the array. It takes the previous value and the current value
    .reduce((arr, el) => {
        return arr.concat(el);
    }, []);

    //console.log(transformedIngredients); 

    if (transformedIngredients.length === 0){
        transformedIngredients = (
            <div>
                <img src={paunchLogo} style={{width: '20%'}} alt="Paunch Burger"/>
                <p className={Styles.red}>ADD MORE FOOD, NERD!</p>
            </div>
        );  
    }
    return (
        <div className={Styles.Burger}>
            <BurgerIngredient type="bread-top" />
            { transformedIngredients }
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default withRouter(burger);