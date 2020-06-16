import React, { PureComponent } from "react";
import logo from "../../logo.svg";
import "./App.css";
import ApiService from "../../api-service";
import Button from "../Button";

class App extends PureComponent {
  state = {
    targetSku: "",
    productId: null,
    name: null,
    tags: null,
    submit: false,
  };

  handleChangeSku = (e) => {
    this.setState({
      targetSku: e.target.value,
    });
  };

  handleSubmit = (e) => {
    this.setState({ submit: true }, () => this.findProduct());
  };

  findProduct = async () => {
    const all = await ApiService.getAll();

    console.log(all);
    const key = all.products.find(
      (key) => key.variants[0].sku === this.state.targetSku
    );

    console.log(key);
    if (key) {
      this.setState({ name: key.title, productId: key.id, tags: key.tags });
    }
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <label htmlFor="sku">Enter sku here</label>
          <input
            type="text"
            name="sku"
            id="sku"
            value={this.state.targetSku}
            onChange={this.handleChangeSku}
          ></input>
          <Button onClick={this.handleSubmit}>Submit</Button>
          {this.state.submit && (
            <div>
              <p>SKU: {this.state.targetSku}</p>
              <p>product name: {this.state.name}</p>
              <p>product Shopify ID: {this.state.productId}</p>
              <p>tags: {this.state.tags}</p>
            </div>
          )}
        </header>
      </div>
    );
  }
}

export default App;
