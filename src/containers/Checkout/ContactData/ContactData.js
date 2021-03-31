import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from '../../../components/UI/Input/Input'
class ContactData extends Component {
  state = {
    name: "Anurag Verma",
    address: {
      street: "vaishali",
      city: "ghaziabad",
      pin: "201010",
      country: "india",
    },
    email: "test@test.com",
    loading: false,
  };

  orderHandler = (event) => {
    event.preventDefault();
    console.log(this.props.ingredients);
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: "Anurag Verma",
        address: {
            street: "vaishali",
            city: "ghaziabad",
            pin: "201010",
            country: "india",
        },
        email: "test@test.com"
      },
      deliveryMethod: "fastest"
    };
    axios
      .post("/orders.json", order)
      .then(response => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch(error => this.setState({ loading: false }));
  };

  render() {
      let form =(
        <form>
        <Input
          inputtype="input"
          type="text"
          name="name"
          placeholder="Enter Name"
        />
        <br />
        <Input
          inputtype="input"
          type="email"
          name="email"
          placeholder="Enter Email"
        />
        <br />
        <Input
          inputtype="input"
          type="text"
          name="street"
          placeholder="Enter Street"
        />
        <br />
        <Input 
          inputtype="input"
          type="text"
          name="city"
          placeholder="Enter City"
        />
        <br />
        <Input
          inputtype="input"
          type="text"
          name="pin"
          placeholder="Enter Pin"
        />
        <br />
        <Input
          inputtype="input"
          type="text"
          name="country"
          placeholder="Enter Country"
        />
        <br />
        <Button btnType="Success" clicked={this.orderHandler}>
          Order
        </Button>
      </form>
      );
    if (this.state.loading) {
        form = <Spinner />;
      }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact details</h4>
        {form}
       
      </div>
    );
  }
}

export default ContactData;
