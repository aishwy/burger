import React from 'react';
import classes from './SideDrawer.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import Logo from '../../Logo/Logo';
import Aux from '../../../hoc/Aux1';
import Backdrop from '../../UI/Backdrop/Backdrop';
const SideDrawer = (props) => {
    const classesSideDrawer = [classes.SideDrawer];
    props.open ? classesSideDrawer.push(classes.Open) : classesSideDrawer.push(classes.Close);
    return (
        <Aux>
        <div className={classesSideDrawer.join(' ')}>
        <Logo />
        <NavigationItems />

        </div>
        </Aux>
    );
}
export default SideDrawer;