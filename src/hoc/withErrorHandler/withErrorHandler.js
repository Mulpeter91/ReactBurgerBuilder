import React, {Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Auxiliary from '../Auxiliary/Auxiliary';

const withErrorHandler = ( WrappedComponent, axios ) => {
    return class extends Component {
        state = {
            error: null
        }

        componentWillMount () { //You could also use the constructor instead of the lifeCycle hook
            this.requestInterceptor = axios.interceptors.request.use(request => {
                //this will clear out any errors before the next request is made
                this.setState({error: null});
                return request;
            });
            this.responseInterceptor = axios.interceptors.response.use(response => response, error => {
                this.setState({error: error})
            });
        }

        // this will trigger when the object isn't  required anymore
        componentWillUnmount() {
            // this eject is to prevent memory leaks because each time this higher order component is call a new instance is created. 
            // this would mean a continously growing collection of interceptors in memory
            axios.interceptors.request.eject(this.requestInterceptor);
            axios.interceptors.response.eject(this.responseInterceptor);
        }

        errorConfirmedHandlder = () => {
            this.setState({error: null});
        }

        render() {
            return (
                <Auxiliary>
                    <Modal show={this.state.error}
                        modalClosed={this.errorConfirmedHandlder}>
                        {this.state.error ? this.state.error.message: null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Auxiliary>
            );
        }
    } 
}

export default withErrorHandler;