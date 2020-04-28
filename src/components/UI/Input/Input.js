import React from 'react';
import styles from './Input.module.css';
import classes from './Input.module.css';

const input = props => {
    let inputElement = null;
    const inputClasses = [styles.InputElement];
    let validationErrorMessage = null;

    if(props.inValid && props.shouldValidate && props.touched) {   
        inputClasses.push(styles.Invalid); 
        //you could also add an error node to the orderForm objecsts in ContactData.js
        validationErrorMessage = <p className={styles.ValidationError}>Please enter a valid {props.elementConfig.placeholder} value</p>;     
    }

    switch(props.elementType){
        case ('input'):
            inputElement = <input 
                className={inputClasses.join(' ')} 
                {...props.elementConfig} 
                value={props.value}
                onChange={props.changed}/>;
            break;
        case ('textarea'):
            inputElement = <textarea 
                className={inputClasses.join(' ')} 
                {...props.elementConfig}
                value={props.value} 
                onChange={props.changed}/>;
            break;
        case ('select'):
            inputElement = (
                <select 
                    className={inputClasses.join(' ')}
                    value={props.value}
                    onChange={props.changed}>
                        {props.elementConfig.options.map(option => (
                            <option 
                                key={option.value}
                                value={option.value}>
                                {option.displayValue}
                            </option>
                        ))}
                    
                </select>
            );
            break;
        default:
            inputElement = <input 
                className={inputClasses.join(' ')} 
                {...props.elementConfig}
                value={props.value} 
                onChange={props.changed}/>;
            break;
    }

    return (
        <div className={classes.Input}>
            <label>{props.label}</label>
            {inputElement}
            {validationErrorMessage}
        </div>
    );
}


export default input;