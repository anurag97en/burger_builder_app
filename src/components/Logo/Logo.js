import React from 'react'
import Logo from '../../assets/images/burger-logo.png'
import classes from './Logo.css'

const logo = (props) => 
  (
        <div className={classes.Logo} style={{height: props.height}}>
            <img src={Logo} alt="MyBurger"></img>
        </div>
    );


export default logo
