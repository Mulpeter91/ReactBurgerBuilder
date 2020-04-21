import React from 'react';
import Styles from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = props => {
    
    console.log(props.ingredients);

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

    console.log(transformedIngredients); 

    if (transformedIngredients.length === 0){
        transformedIngredients = <p className={Styles.red}>Please start adding ingredients!</p>
    }
    return (
        <div className={Styles.Burger}>
            <BurgerIngredient type="bread-top" />
            { transformedIngredients }
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default burger;