import React from "react";
import { Link } from "react-router-dom";
import PosterError from "../assets/img/PosterError.png";

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

  const errors = (e) => {
    e.target.src = PosterError;
  };

  return (
    <Link to={"/movie/" + props.id}>
      <div className="card">
        <div className="card-cover">
          <img
            src={props.cover}
            alt="Movie Cover"
            onError={errors.bind(this)}
          />
        </div>
        <div className="card-detail">
          <h4 className="card-title">{props.title}</h4>
          <div className="card-rating">
            <span className="stars">{ratingStars()}</span>
            <p>{props.rating}</p>
          </div>
          <p className="card-language">{props.language}</p>

          <div className="card-genres">
            {props.genre ? (
              <p>{props.genre.join(", ")}</p>
            ) : (
              <span>&nbsp;</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
