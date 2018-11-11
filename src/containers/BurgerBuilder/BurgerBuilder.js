import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import Backdrop from '../../components/UI/Backdrop/Backdrop';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
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
            ingridients: {
                salad : 0,
                bacon: 0,
                meat: 0,
                cheese: 0
    
            },
            price : 5,
            lessDisable: true,
            purchasable: false,
            purchasing: false
        };
    }
    updatePurchaseStatus () {
        const newIngridients = {...this.state.ingridients};
        const sum = Object.keys(newIngridients).map(
            igkey=>{
                return newIngridients[igkey];
            }
        ).reduce((sum,el)=>{return sum+el;},0);
        this.setState({
            purchasable:sum>0
        });
    }
    purchaseHandler = () => {
        console.log("order");
        this.setState({purchasing:true});
    }
    backHandler = () => {
        console.log("back");
        this.setState({purchasing:false});
    }
    purchaseContinueHandler = () => {
        alert("continue!");
    }
    moreHandler = (type) => {
        const newIngridients = this.state.ingridients;
        newIngridients[type] = newIngridients[type]+1;
        const newPrice = this.state.price + PRICES[type];

        this.setState({
            ingridients:{...newIngridients},
            price: newPrice
        });
        this.updatePurchaseStatus();

    }

    lessHandler = (type) => {
        const newIngridients = this.state.ingridients;
        if(newIngridients[type]!=0){
            newIngridients[type] = newIngridients[type]-1;
            const newPrice = this.state.price - PRICES[type];

            this.setState({
                ingridients:{...newIngridients},
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
        const disableInfo = {...this.state.ingridients};
        for(let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <=0
        }
        return (
            
            <Aux>
                <Backdrop show={this.state.purchasing} click={this.backHandler} />
                <Modal show={this.state.purchasing}> 
                    <OrderSummary 
                        price= {this.state.price}
                        yes={this.purchaseContinueHandler} 
                        no={this.backHandler}
                        ingridients={this.state.ingridients} 
                    /> 
                </Modal>
                
                <Burger ingridients={this.state.ingridients}/>
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

export default BurgerBuilder;