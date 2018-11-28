import React from 'react';
import classes from './Burger.css';
import Aux from '../../hoc/Aux1';
import BurgerIngridient from './BurgerIngridient/BurgerIngridient';
const Burger = (props) => {
    let ingridients2 = Object.keys(props.ingridients).map(
        
        (igkey) => {
            return [...Array(props.ingridients[igkey])].map((_,i)=>{
                return <BurgerIngridient key={igkey+i} type={igkey} />
            })
        }
    ).reduce((ar,el)=>{return ar.concat(el)},[]);
    if(ingridients2.length===0){
        ingridients2=<p>Please start adding ingridients!</p>
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngridient type="BreadTop"/>
            {ingridients2}
            <BurgerIngridient type="BreadBottom" />
        </div>
    )
}

export default Burger;