import React,{Component} from 'react';
import Button from '../../components/UI/Button/Button';

import {Switch,Route,Link} from 'react-router-dom';
import ContactDetails from './ContactDetails';
import Aux from '../../hoc/Aux1';
class Checkout extends Component{
    constructor(props) {
        super(props);
        this.state = {
            ingridients: null
        };
    }
    componentDidMount(){
        console.log("componentDidMount_Checkout");
        const ingrs = {};
        const ing = new URLSearchParams(this.props.location.search);
        for (var ingr of ing.entries()) {
            ingrs[ingr[0]]=+ingr[1];
        }
        console.log(ingrs);
        this.setState({ ingridients: 'res.data' });
        console.log(this.state);   
    }
    
    render(){
        return(<Aux><div style={{textAlign:'center',margin:'auto',backgroundColor:'#ffe4c4'}}>
        <h1>We hope it tastes well.</h1>
        {/* { <h3>You have ordered: {this.state.ingrs}</h3> } */}
        <Link to="/checkout/contact-details"><Button type="Success"> Confirm order </Button></Link>
        <Link to="/"><Button type="Danger"> Back to Builder </Button></Link>
        </div>
        <Route path="/checkout/contact-details" component={ContactDetails}/></Aux>)
    }
}
export default Checkout;