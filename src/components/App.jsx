import React, { Component } from "react";
import Cards from "./Cards";

class App extends Component {
  render() {
    return (
      <div className="cards">
        <h1 className="cards__title">Ты сегодня покормил кота?</h1>
        <Cards />
      </div>
    );
  }
}

export default App;
