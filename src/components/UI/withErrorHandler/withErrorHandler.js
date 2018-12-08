import React, { Component } from 'react';
import Aux from '../../../hoc/Aux1';
import Modal from '../Modal/Modal';
import axios from '../../../axios-orders';
const withErrorHandler = (WrappedComponent) => {
    return class extends Component {
        state = {
            error : null
        }
        componentWillMount() {
            console.log("ErrHandler_componentDidMount")
            axios.interceptors.response.use(res=>res,err=>{
                console.log("ErrHandler_interceptors.response.err")
                this.setState({error: err})
            });
            axios.interceptors.request.use(req=>{
                console.log("ErrHandler_interceptors.request")
                this.setState({error: null});
                return req;
            },err=>{
                this.setState({error: err})
            })
        }
        backHandler = () => this.setState({error:null});
        render() {
            return (
                <Aux>
                    <Modal show = {this.state.error}
                            click = {this.backHandler}>
                        {this.state.error? this.state.error.message: null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    }
}

export default withErrorHandler;