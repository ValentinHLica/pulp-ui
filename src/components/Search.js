import React from "react";
import { Consumer } from "./Context";

import Card from "./dummy/Card";
import SearchOptions from "./dummy/SearchOptions";
import Paggination from "./dummy/Paggination";

export default function Search() {
  return (
    <Consumer>
      {(value) => (
        <div className="container wrapper">
          <h1 className="site-name">
            <i className="fas fa-film"></i> <span>Pulp</span> Stream
          </h1>

          <form id="form" onSubmit={value.searchMovies}>
            <i className="fas fa-search"></i>
            <input
              type="text"
              id="query"
              placeholder="Search..."
              onChange={value.changeQuery}
            />
          </form>

          <SearchOptions />

          {value.data.length === 0 && value.loading !== true ? (
            <div className="explore" onClick={value.searchMovies}>
              <button>
                <i className="fas fa-random"></i> Explore
              </button>
            </div>
          ) : null}

          {value.data.length !== 0 ? (
            value.paggination[2] > 20 ? (
              <Paggination
                changePage={value.changePage}
                setPage={value.setPage}
                paggination={value.paggination}
              />
            ) : null
          ) : null}

          {value.loading ? (
            <div className="loading">
              <div className="loader"></div>
            </div>
          ) : null}

          {value.err ? <h1 className="err">Nothing was found</h1> : null}
          <div id="row">
            {value.data.length !== 0
              ? value.data.map((element, index) => {
                  return (
                    <Card
                      key={index}
                      title={element.title}
                      cover={element.medium_cover_image}
                      rating={element.rating}
                      language={element.language}
                      genre={element.genres}
                      id={element.id}
                    />
                  );
                })
              : null}
          </div>

          {value.data.length !== 0 ? (
            value.paggination[2] > 20 ? (
              <Paggination
                changePage={value.changePage}
                setPage={value.setPage}
                paggination={value.paggination}
              />
            ) : null
          ) : null}
        </div>
      )}
    </Consumer>
  );
}
