import React, { Component } from "react";
import CardItem from "./CardItem";

class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        {
          id: 1,
          ingredient: "с фуа-гра",
          portionAmount: 10,
          bonusAmount: 1,
          feedBack: "",
          weightInKg: "0,5",
          description: "Печень утки разварная с артишоками.",
          disabled: false,
          selected: false
        },
        {
          id: 2,
          ingredient: "с рыбой",
          portionAmount: 40,
          bonusAmount: 2,
          feedBack: "",
          weightInKg: "2",
          description: "Головы щучьи с чесноком да свежайшая сёмгушка.",
          disabled: false,
          selected: true
        },
        {
          id: 3,
          ingredient: "с курой",
          portionAmount: 100,
          bonusAmount: 5,
          feedBack: "Заказчик доволен",
          weightInKg: "5",
          description: "Филе из цыплят с трюфелями в бульоне.",
          disabled: true,
          selected: false
        }
      ]
    };
    this.onItemClick = this.onItemClick.bind(this);
  }

  onItemClick(item) {
    const items = this.state.items.map(stateItem => {
      if (stateItem.id === item.id) {
        stateItem.selected = !stateItem.selected;
      }

      return stateItem;
    });

    this.setState({ items });
  }

  render() {
    return (
      <div className="goods">
        {this.state.items.map(item => (
          <CardItem
            key={item.id}
            {...item}
            onClick={() => this.onItemClick(item)}
          />
        ))}
      </div>
    );
  }
}

export default Cards;
