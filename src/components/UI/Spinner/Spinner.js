import React from 'react';
import classes from './Spinner.css';
const Spinner = () => {
    return (
    <div className={classes.Loading} style={{left:'45%'}}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>)
}
export default Spinner;