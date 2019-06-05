import React, { Component } from "react";
import CatImage from "../img/cat.png";

const subtitles = {
  DEFAULT: "Сказочное заморское яство",
  QUESTION: "Котэ не одобряет?"
};

class CardItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      subtitle: subtitles.DEFAULT,
      title: "Нямушка",
      hover: false
    };

    this.onClick = this.onClick.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
  }

  onClick(event) {
    event.preventDefault();

    if (!this.props.disabled) {
      this.setState({ subtitle: subtitles.DEFAULT });
    }

    this.props.onClick();
  }

  onMouseEnter(event) {
    event.preventDefault();

    if (this.props.selected && !this.props.disabled) {
      this.setState({ subtitle: subtitles.QUESTION });
    }
    if (!this.props.hover) {
      this.setState({ hover: true });
    }
  }

  onMouseLeave(event) {
    event.preventDefault();
    this.setState({ subtitle: subtitles.DEFAULT });
    if (!this.props.hover) {
      this.setState({ hover: false });
    }
  }

  render() {
    const {
      ingredient,
      portionAmount,
      bonusAmount,
      feedBack,
      weightInKg,
      description,
      disabled,
      selected
    } = this.props;
    let circleClasses = "circle";
    let cardClasses = "card";

    if (disabled) {
      circleClasses += " circle_disabled";
      cardClasses += " card_disabled";
    } else {
      if (selected) {
        circleClasses += " circle_selected";
        cardClasses += " card_selected";
      } else {
        circleClasses += " circle_unselected";
        cardClasses += " card_unselected";
      }
    }

    return (
      <div className="card-wrapper">
        <div
          className={cardClasses}
          onClick={this.onClick}
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
        >
          <div className="card__subtitle">{this.state.subtitle}</div>
          <h2 className="card__title">
            {this.state.title}
            <span className="card__ingredient">{ingredient}</span>
          </h2>
          <ul className="card__inform">
            <li>
              <span className="card__inform_bold">{portionAmount}</span>{" "}
              {getNoun(portionAmount, ["порция", "порции", "порций"])}
            </li>
            <li className="card-inform__bonus">
              <BonusText bonusAmount={bonusAmount} />
            </li>
            <li>{feedBack}</li>
          </ul>
          <div className="card__img">
            <img src={CatImage} alt="Здесь должен был быть кот" />
          </div>
          <div className={circleClasses}>
            <div className="circle__value">{weightInKg}</div>
            <div className="circle__unit">кг</div>
          </div>
        </div>
        <div className="card__caption">
          {disabled && (
            <p className="card__caption_disabled">
              Печалька, {ingredient} закончился.
            </p>
          )}
          {!selected && !disabled && (
            <p>
              Чего сидишь? Порадуй котэ,
              <a
                className="card__link card__link_hover"
                onClick={this.onClick}
                href="#"
              >
                купи.
              </a>
            </p>
          )}
          {selected && !disabled && <p>{description}</p>}
        </div>
      </div>
    );
  }
}

function getNoun(number, words) {
  return words[
    number % 100 > 4 && number % 100 < 20
      ? 2
      : [2, 0, 1, 1, 1, 2][Math.min(number % 10, 5)]
  ];
}

function BonusText(props) {
  const { bonusAmount } = props;

  if (bonusAmount === 0) {
    return null;
  }

  const text = getNoun(bonusAmount, ["мышь", "мыши", "мышей"]) + " в подарок";

  if (bonusAmount === 1) {
    return text;
  }

  return (
    <React.Fragment>
      <span className="card__inform_bold">{bonusAmount}</span> {text}
    </React.Fragment>
  );
}

export default CardItem;
