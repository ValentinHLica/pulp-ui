import React from "react";
import { Consumer } from "../Context";

export default function SearchOptions() {
  const changeOptions = (option, changeOptions, element) => {
    changeOptions(element.target.value, option);
  };

  return (
    <Consumer>
      {(value) => (
        <div id="options-box">
          <div className="select-box">
            <h3>Quality:</h3>
            <select
              className="selected"
              onChange={changeOptions.bind(this, 0, value.changeOptions)}
            >
              <option value="all">All</option>
              <option value="720p">720p</option>
              <option value="1080p">1080p</option>
              <option value="3D">3D</option>
            </select>
          </div>

          <div className="select-box">
            <h3>Genre:</h3>
            <select
              className="selected"
              onChange={changeOptions.bind(this, 1, value.changeOptions)}
            >
              <option value="all">All</option>
              <option value="Action">Action</option>
              <option value="Adventure">Adventure</option>
              <option value="Animation">Animation</option>
              <option value="Biography">Biography</option>
              <option value="Comedy">Comedy</option>
              <option value="Crime">Crime</option>
              <option value="Documentary">Documentary</option>
              <option value="Drama">Drama</option>
              <option value="Family">Family</option>
              <option value="Fantasy">Fantasy</option>
              <option value="Film-Noir">Film-Noir</option>
              <option value="Game-Show">Game-Show</option>
              <option value="History">History</option>
              <option value="Horror">Horror</option>
              <option value="Music">Music</option>
              <option value="Musical">Musical</option>
              <option value="Mystery">Mystery</option>
              <option value="News">News</option>
              <option value="Reality-TV">Reality-TV</option>
              <option value="Romance">Romance</option>
              <option value="Sci-Fi">Sci-Fi</option>
              <option value="Sport">Sport</option>
              <option value="Talk-Show">Talk-Show</option>
              <option value="Thriller">Thriller</option>
              <option value="War">War</option>
              <option value="Western">Western</option>
            </select>
          </div>

          <div className="select-box">
            <h3>Rating:</h3>
            <select
              className="selected"
              onChange={changeOptions.bind(this, 2, value.changeOptions)}
            >
              <option value="0">All</option>
              <option value="9">9</option>
              <option value="8">8</option>
              <option value="7">7</option>
              <option value="6">6</option>
              <option value="5">5</option>
              <option value="4">4</option>
              <option value="3">3</option>
              <option value="2">2</option>
              <option value="1">1</option>
            </select>
          </div>

          <div className="select-box">
            <h3>Order by:</h3>
            <select
              className="selected"
              onChange={changeOptions.bind(this, 3, value.changeOptions)}
            >
              <option value="date_added">Latest</option>
              <option value="like_count">Likes</option>
              <option value="download_count">Downloads</option>
              <option value="rating">Rating</option>
              <option value="year">Year</option>
              <option value="title">Alphabetical</option>
            </select>
          </div>
        </div>
      )}
    </Consumer>
  );
}
