import React, {Component} from 'react';
import Button from '../../components/UI/Button/Button';
import Aux from '../../hoc/Aux1';
import axios from '../../axios-orders';
class ContactDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            addr: {
                street:'',
                postalCode:'',
                city:'',
                country:''
            },
            phone: '',
            email: ''
        };
    }
    purchaseContinueHandler = () => {
        console.log("purchaseContinueHandler");
        axios.post('/orders.json', {
            ingridients: null,
            price: null, //must recalculate on server
            customer: {
                name: 'Aishwarya',
                addr: {
                    street: "test street",
                    country: "India"
                }
            }
        }).then(r => {
            
        }).catch(e => {
            
        })
    }
    
    render() {
        return(
            <Aux>
            <form>
                <input type="text" placeholder="Enter you name"/>
                <input type="tel" placeholder="Enter you Phone"/>
                <input type="email" placeholder="Enter you Email"/>
            </form>
            <Button type="Success" clicked={this.purchaseContinueHandler}>ORDER</Button>
            </Aux>
        )
    }
}
export default ContactDetails;