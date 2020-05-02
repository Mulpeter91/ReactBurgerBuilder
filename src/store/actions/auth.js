import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS, 
        idToken: token, 
        userId: userId
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL, 
        error: error
    };
};

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000); //firebase sets timeout at 1 hours or 3600 seconds. setTimeout expects miliseconds.
    };
};

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email, 
            password: password, 
            returnSecureToken: true
        };
        
        const apiServerKey = 'AIzaSyB5mZNcPhr69Wa_Z3iM0wXu13vbmIZ7pqY';
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + apiServerKey;
        if(!isSignUp) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + apiServerKey;
        }

        axios.post(url, authData)
            .then(response => {
                console.log(response);
                // console.log('Id Token:', response.data.idToken);
                // console.log('Local Id:', response.data.localId);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(err => {
                console.log('An error has occrued on sign up call: ', err);
                dispatch(authFail(err.response.data.error));
            });
    };
};