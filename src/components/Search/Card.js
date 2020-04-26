import React from "react";
import { Link } from "react-router-dom";

export default function Card(props) {
  const ratingStars = () => {
    const stars = [];

    for (let i = 0; i < 5; i++) {
      if (i < Math.ceil(props.rating / 2)) {
        stars.push(<i className="fas fa-star rating-true" key={i}></i>);
      } else {
        stars.push(<i className="fas fa-star" key={i}></i>);
      }
    }

    return stars;
  };

  return (
    <Link to={"/movie/" + props.id}>
      <div className="card">
        <div className="card-cover">
          <img src={props.cover} alt="brih" />
        </div>
        <div className="card-detail">
          <h4 className="card-title">{props.title}</h4>
          <div className="card-rating">
            <span className="stars">{ratingStars()}</span>
            <p>{props.rating}</p>
          </div>
          <p className="card-language">{props.language}</p>
          <div className="card-genres">
            <p>{props.genre.join(", ")}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
