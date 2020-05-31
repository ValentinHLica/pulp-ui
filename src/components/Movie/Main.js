import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { Consumer } from "../Context";
import jwt from "jsonwebtoken";

export default function Movie(props) {
  const [data, setData] = useState({});
  const [loading, setloading] = useState(false);
  const [err, setErr] = useState(false);
  const [modal, setModal] = useState(false);
  const [iframeSrc, setIframeSrc] = useState("");
  const [mode, setMode] = useState(null);
  const [screenshot, setScreenshot] = useState("");
  const [bookmarked, setbookmarked] = useState(false);

  const modalSwitch = (src, modalMode) => {
    setModal(!modal);
    if (modalMode === "iframe") {
      setIframeSrc(src);
      setMode("iframe");
    }

    if (modalMode === "screenshot") {
      setScreenshot(src);
      setMode("screenshot");
    }

    if (modalMode === "download") {
      setMode("download");
    }
  };

  const ratingStars = () => {
    const stars = [];

    for (let i = 0; i < 5; i++) {
      if (i < Math.ceil(data.rating / 2)) {
        stars.push(<i className="fas fa-star rating-true" key={i}></i>);
      } else {
        stars.push(<i className="fas fa-star" key={i}></i>);
      }
    }

    return stars;
  };

  const bookmarkMovie = () => {
    const cookies = new Cookies();
    const token = cookies.get("token");

    if (!bookmarked) {
      axios
        .post(
          "http://localhost:5000/bookmark",
          {
            movieCode: data.id,
            title: data.title,
            year: data.year,
            rating: data.rating,
            genres: data.genres,
            language: data.language,
            cover: data.medium_cover_image,
            user: jwt.decode(token).id,
            check: false,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(() => {
          setbookmarked(true);
        })
        .catch();
    } else {
      axios
        .post(
          "http://localhost:5000/bookmark/delete",
          {
            movieCode: data.id,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(() => {
          setbookmarked(false);
        });
    }
  };

  const checkBookmark = (id) => {
    const cookies = new Cookies();
    const token = cookies.get("token");

    axios
      .post(
        "http://localhost:5000/bookmark/check",
        {
          movieCode: id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((e) => {
        if (e.data.data) {
          setbookmarked(true);
        }
      });
  };

  useEffect(() => {
    setData([]);
    setloading(true);
    axios
      .get(`http://localhost:5000/movie/${props.match.params.id}`)
      .then((e) => {
        if (e.data.data.id !== 0) {
          setloading(false);
          setData({ ...e.data.data });

          const cookies = new Cookies();
          const token = cookies.get("token");

          if (token) {
            checkBookmark(e.data.data.id);
          }
        } else {
          setloading(false);
          setErr(true);
        }
      })
      .catch(() => {
        setloading(false);
        setErr(true);
      });
    // eslint-disable-next-line
  }, []);
  return (
    <Consumer>
      {(value) => (
        <div className="container wrapper">
          {modal ? (
            <div id="modal">
              <div
                className="bc"
                onClick={modalSwitch.bind(this, null, null)}
              ></div>
              <div id="modal-content">
                {mode === "iframe" ? (
                  <iframe
                    src={iframeSrc}
                    title="Stream movie"
                    frameBorder="0"
                    allowFullScreen
                    id="iframe"
                  ></iframe>
                ) : null}

                {mode === "screenshot" ? (
                  <img
                    id="screenshot"
                    src={screenshot.replace("medium", "large")}
                    alt="Screenshot"
                  ></img>
                ) : null}

                {mode === "download" ? (
                  <div className="options">
                    {data.torrents.map((e, index) => (
                      <a href={e.url} key={index}>
                        {e.quality} - {e.type} - {e.size}
                      </a>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          ) : null}

          {loading ? (
            <div className="loading">
              <div className="loader"></div>
            </div>
          ) : null}

          {err ? <h1 className="err">Nothing was found</h1> : null}

          {data.id ? (
            <div className="movie">
              <div className="movie-cover">
                <img src={data.background_image} alt="Movie Poster" />
                <div
                  className="play cover-play"
                  onClick={modalSwitch.bind(this, data.stream, "iframe")}
                >
                  <i className="fas fa-play"></i>
                </div>

                <div id="links">
                  <div className="download">
                    <p onClick={modalSwitch.bind(this, null, "download")}>
                      <i className="fas fa-cloud-download-alt"></i> Download
                    </p>
                  </div>
                  <div
                    id="trailer"
                    onClick={modalSwitch.bind(
                      this,
                      "https://www.youtube.com/embed/" + data.yt_trailer_code,
                      "iframe"
                    )}
                  >
                    <i className="fab fa-youtube"></i> Trailer
                  </div>
                </div>
              </div>

              <div className="movie-detail">
                <div className="movie-poster">
                  <img src={data.medium_cover_image} alt="Movie Cover" />
                  {value.token ? (
                    <div
                      className={`movie-bookmark ${
                        bookmarked ? "bookmarked" : null
                      }`}
                      onClick={bookmarkMovie}
                    >
                      <i className="fas fa-bookmark"></i>
                    </div>
                  ) : null}

                  <div
                    className="play poster-play"
                    onClick={modalSwitch.bind(this, data.stream, "iframe")}
                  >
                    <i className="fas fa-play"></i>
                  </div>
                </div>

                <div className="detail">
                  <h2 className="movie-title">{data.title}</h2>
                  <div className="rating">
                    <div className="stars">{ratingStars()}</div>
                    <p>{data.rating}</p>
                  </div>
                  <ul className="more">
                    {data.runtime !== 0 ? (
                      <li>{data.runtime + " min"}</li>
                    ) : null}
                    <li>{data.genres.join(", ")}</li>
                    <li>{data.year}</li>
                    <li>{data.language}</li>
                  </ul>
                  <p className="desc">
                    <strong>Summary: </strong>
                    {data.description_intro}
                  </p>

                  <div id="links">
                    <div className="download">
                      <p onClick={modalSwitch.bind(this, null, "download")}>
                        <i className="fas fa-cloud-download-alt"></i> Download
                      </p>
                    </div>
                    <div
                      id="trailer"
                      onClick={modalSwitch.bind(
                        this,
                        "https://www.youtube.com/embed/" + data.yt_trailer_code,
                        "iframe"
                      )}
                    >
                      <i className="fab fa-youtube"></i> Trailer
                    </div>
                  </div>
                </div>
              </div>

              <div className="movie-screenshots">
                <h1>Screenshots:</h1>
                <div className="screenshots">
                  <img
                    src={data.medium_screenshot_image1}
                    alt="Screenshot 1"
                    onClick={modalSwitch.bind(
                      this,
                      data.medium_screenshot_image1,
                      "screenshot"
                    )}
                  />
                  <img
                    src={data.medium_screenshot_image2}
                    alt="Screenshot 2"
                    onClick={modalSwitch.bind(
                      this,
                      data.medium_screenshot_image2,
                      "screenshot"
                    )}
                  />
                  <img
                    src={data.medium_screenshot_image3}
                    alt="Screenshot 3"
                    onClick={modalSwitch.bind(
                      this,
                      data.medium_screenshot_image3,
                      "screenshot"
                    )}
                  />
                </div>
              </div>

              {data.cast ? (
                <div className="movie-actors">
                  <h1>Actors:</h1>
                  <ul>
                    {data.cast.map((e, index) => {
                      return (
                        <li key={index}>
                          {e.url_small_image ? (
                            <img
                              src={e.url_small_image}
                              alt={e.name + " Headshot"}
                            />
                          ) : (
                            <i className="fas fa-user"></i>
                          )}

                          <p>
                            {e.name} as {e.character_name}
                          </p>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      )}
    </Consumer>
  );
}
