import React, { Component } from 'react';
import Aux from '../../hoc/Aux1';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import Backdrop from '../../components/UI/Backdrop/Backdrop';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../components/UI/withErrorHandler/withErrorHandler';
const PRICES = {
    salad: 0.8,
    meat: 1.5,
    bacon: 0.5,
    cheese: 1
}
class BurgerBuilder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ingridients: null,
            price: 5,
            lessDisable: true,
            purchasable: false,
            purchasing: false,
            loading: false,
            err: false
        };
    }
    componentDidMount() {
        axios.get("/Ingridients.json")
            .then(res => {
                this.setState({ ingridients: res.data })
            })
            .catch(err=>{this.setState({err:true})})
    }
    updatePurchaseStatus() {
        const newIngridients = { ...this.state.ingridients };
        const sum = Object.keys(newIngridients).map(
            igkey => {
                return newIngridients[igkey];
            }
        ).reduce((sum, el) => { return sum + el; }, 0);
        this.setState({
            purchasable: sum > 0
        });
    }
    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }
    backHandler = () => {
        this.setState({ purchasing: false });
    }
    purchaseContinueHandler = () => {
        this.setState({ loading: true });
        axios.post('/orders.json', {
            ingridients: this.state.ingridients,
            price: this.state.price, //must recalculate on server
            customer: {
                name: 'Aishwarya',
                addr: {
                    street: "test street",
                    country: "India"
                }
            }
        }).then(r => {
            this.setState({ loading: false, purchasing: false });
        }).catch(e => {
            this.setState({ loading: false, purchasing: false });
        })
    }
    moreHandler = (type) => {
        if(this.state.ingridients)
        {const newIngridients = this.state.ingridients;
        newIngridients[type] = newIngridients[type] + 1;
        const newPrice = this.state.price + PRICES[type];

        this.setState({
            ingridients: { ...newIngridients },
            price: newPrice
        });}
        this.updatePurchaseStatus();

    }

    lessHandler = (type) => {
        const newIngridients = this.state.ingridients;
        if (newIngridients[type] != 0) {
            newIngridients[type] = newIngridients[type] - 1;
            const newPrice = this.state.price - PRICES[type];

            this.setState({
                ingridients: { ...newIngridients },
                price: newPrice
            });
            this.updatePurchaseStatus();
        }
        else {
            this.setState({
                lessDisable: true
            })

        }
    }

    render() {
        const disableInfo = { ...this.state.ingridients };
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0
        }
        let orderSummary = null;


        let burger = this.state.err ? <p style={{textAlign:"center"}}>Can not load ingridients. Please retry after some time.</p> : <Spinner />;
        if (this.state.ingridients) {
            burger = <Burger ingridients={this.state.ingridients} />;
            orderSummary = <OrderSummary
                price={this.state.price}
                yes={this.purchaseContinueHandler}
                no={this.backHandler}
                ingridients={this.state.ingridients} />;
        }

        if (this.state.loading) orderSummary = <Spinner />;
        return (

            <Aux>

                <Modal show={this.state.purchasing}
                    click={this.backHandler}
                >
                    {orderSummary}
                </Modal>

                {burger}
                <BuildControls
                    ordered={this.purchaseHandler}
                    more={this.moreHandler}
                    less={this.lessHandler}
                    disable={disableInfo}
                    price={this.state.price.toFixed(2)}
                    purchasable={this.state.purchasable}
                />
            </Aux>
        )
    }
}

export default withErrorHandler(BurgerBuilder);