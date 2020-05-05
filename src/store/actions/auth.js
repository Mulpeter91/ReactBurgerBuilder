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
    return dispatch => {
        dispatch(deleteUserIdToken());
        dispatch(clearExistingOrdersArray());
    }    
}

export const deleteUserIdToken = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDateTime');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_DELETE_TOKEN
    };
};

export const clearExistingOrdersArray = () => {
    return {
        type: actionTypes.AUTH_CLEAR_ORDERS
    }
}

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
        
        const apiServerKey = '';
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + apiServerKey;
        if(!isSignUp) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + apiServerKey;
        };
        axios.post(url, authData)
            .then(response => {
                const expirateDateTime = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDateTime', expirateDateTime);
                localStorage.setItem('userId', response.data.localId);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(err => {
                console.log('An error has occrued on sign up call: ', err);
                dispatch(authFail(err.response.data.error));
            });
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH, 
        path: path
    };
}; 

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token) {
            dispatch(logout());
        } else {
            const expirationDateTime = new Date(localStorage.getItem('expirationDateTime'));
            if (expirationDateTime <= new Date()){
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationDateTime.getTime() - new Date().getTime()) / 1000 ));
            }          
        }
    };
};