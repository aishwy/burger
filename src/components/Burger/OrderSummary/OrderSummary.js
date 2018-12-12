import React from 'react';
import Aux from '../../../hoc/Aux1';
import { Transform } from 'stream';
import Button from '../../UI/Button/Button';
import classes from './OrderSummary.css'
import {Link} from 'react-router-dom';
const orderSummary = (props) => {
    const ingridientSummary = Object.keys(props.ingridients).map((igkey) =>{
        return (
        <li key={igkey}>
        <span style={{textTransform: 'capitalize'}}>{igkey}</span> : {props.ingridients[igkey]}
        </li> );
    })
    let queryparams = [];
    for (var key in props.ingridients) {
        if (props.ingridients.hasOwnProperty(key)) {
            queryparams.push(key+"="+props.ingridients[key])
        }
    }
    queryparams=queryparams.join('&');
return (

    <Aux>
    <h2> Here's what you put together </h2>
    <p><ul>{ingridientSummary}</ul></p>
    <div className={classes.Price}> Total Price : ${props.price.toFixed(2)} </div>
    <p>Do you wanna order the burger? </p>

    <Link to={"/checkout?"+queryparams}><Button clicked={props.yes} type="Success"> YES </Button></Link>
    <Button clicked={props.no} type="Danger"> NO, GO BACK </Button>
    </Aux>
);
}

export default orderSummary;