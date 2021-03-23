import React, { Component } from "react";
import axios from "../../axios-orders";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Burger from "../../components/Burger/Burger";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import Modal from "../../components/UI/Modal/Modal";
import Auxiliary from "../../hoc/Auxiliary";
import withErrorHandling from "../../hoc/withErrorHandling/withErrorHandling";

const INGREDIENT_PRICES = {
  meat: 2,
  cheese: 1,
  salad: 0.5,
  bacon: 0.5,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 5,
    purchaseable: false,
    purchasing: false,
    loading: false,
    error: false
  };
  componentDidMount() {
    axios
      .get(
        "https://react-my-burger-73f61-default-rtdb.firebaseio.com/ingredients.json"
      )
      .then((response) => {
        this.setState({ ingredients: response.data });
      })
      .catch(error => this.setState({error : true}));
  }

  updatePurchase(ingredients) {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ purchaseable: sum > 0 });
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const finalPrice = oldPrice + priceAddition;
    this.setState({ totalPrice: finalPrice, ingredients: updatedIngredients });
    this.updatePurchase(updatedIngredients);
  };
  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount > 0) {
      const updatedCount = oldCount - 1;
      const updatedIngredients = {
        ...this.state.ingredients,
      };
      updatedIngredients[type] = updatedCount;
      const priceSubstraction = INGREDIENT_PRICES[type];
      const oldPrice = this.state.totalPrice;
      const finalPrice = oldPrice - priceSubstraction;
      this.setState({
        totalPrice: finalPrice,
        ingredients: updatedIngredients,
      });
      this.updatePurchase(updatedIngredients);
    }
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };
  purchaseContinueHandler = () => {
    // alert("Continue to Checkout Page");
    this.setState({ loading: true });

    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: "Anurag Verma",
        email: "anuragverma218447@gmail.com",
        address: {
          street: "vaishali",
          city: "ghaziabad",
          country: "india",
        },
        mode: "fast_delivery",
      },
    };

    axios
      .post("/orders.json", order)
      .then((response) => {
        this.setState({ loading: false, purchasing: false });
      })
      .catch((error) => {
        this.setState({ loading: false, purchasing: false });
      });
  };
  render() {
    const disabledInfo = {
      ...this.state.ingredients,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;

    let burger = this.state.error ? <p>Ingredients Can't be loaded</p> : <Spinner />;
    if (this.state.ingredients) {
       burger = (
        <Auxiliary>

          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            purchaseable={this.state.purchaseable}
            purchase={this.purchaseHandler}
            finalPrice={this.state.totalPrice}
          />
        </Auxiliary>
      );
      orderSummary =  <OrderSummary
            ingredients={this.state.ingredients}
            clickcontinue={this.purchaseContinueHandler}
            clickcancel={this.purchaseCancelHandler}
            finalPrice={this.state.totalPrice}
          />
          if (this.state.loading) {
            orderSummary = <Spinner />;
          }
    
    }
    
    
    return (
      <Auxiliary>
        <Modal
          show={this.state.purchasing}
          closeModal={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Auxiliary>
    );
  }
}
export default withErrorHandling(BurgerBuilder, axios);
