import React, { Component } from 'react'
import Auxiliary from '../../../hoc/Auxiliary'
import Button from '../../UI/Button/Button'

class OrderSummary extends Component {
    componentWillUpdate(){
        console.log('[OrderSummary] will update')
    }
    render() {
        const ingredientSummary= Object.keys(this.props.ingredients)
    .map(igKey => {
        return (
            <li key={igKey}>
                <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {this.props.ingredients[igKey]}
            </li> );
    } );
        return (
            <Auxiliary>
            <h3>Your Order Details</h3>
            <p>Your burger is having following ingredients</p>
            <ul>{ingredientSummary}</ul>
            <p><b style={{textAlign:"center"}}>Total Cost of Burger is:    {this.props.finalPrice}</b></p>
           <p>Continue to checkout</p>
           
           <Button btnType="Danger" clicked={this.props.clickcancel}>CANCEL</Button>
           <Button btnType="Success" clicked={this.props.clickcontinue}>CONTINUE</Button>
         </Auxiliary>



        );
    }
}
export default OrderSummary
