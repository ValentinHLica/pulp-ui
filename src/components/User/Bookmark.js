import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

import Card from "../Search/Card";
import Paggination from "./Paggination";

export default function Bookmarks(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noBookmarks, setNoBookmarks] = useState(false);
  const [paggination, setPaggination] = useState([]);

  const changePage = (bool) => {
    const cookies = new Cookies();
    const token = cookies.get("token");
    const pagginations = [...paggination];

    let [limit, page, count] = pagginations;
    if (bool) {
      if (Math.ceil(count / limit) > page) {
        pagginations[1]++;
      }
    } else {
      if (page >= 2) {
        pagginations[1]--;
      }
    }
    setPaggination(pagginations);
    setData([]);
    setLoading(true);

    axios
      .get(
        `https://portfolio-server-vl.herokuapp.com/bookmark?page=${pagginations[1]}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((e) => {
        setLoading(false);
        setData(e.data.data);
      })

      .catch(() => {
        setLoading(false);
        setNoBookmarks(true);
      });
  };

  const setPage = (e) => {
    const cookies = new Cookies();
    const token = cookies.get("token");
    setData([]);
    setLoading(true);
    const pagginations = [...paggination];
    pagginations[1] = e;

    axios
      .get(
        `https://portfolio-server-vl.herokuapp.com/bookmark?page=${pagginations[1]}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((e) => {
        setData(e.data.data);
        setLoading(false);
        setPaggination(pagginations);
      })

      .catch(() => {
        setLoading(false);
        setNoBookmarks(true);
      });
  };

  useEffect(() => {
    const cookies = new Cookies();
    const token = cookies.get("token");

    if (!token) {
      props.history.push("/");
    }

    setLoading(true);

    axios
      .get("https://portfolio-server-vl.herokuapp.com/bookmark?page=1", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((e) => {
        setLoading(false);

        if (e.data.data.length !== 0) {
          setData([...e.data.data]);
          setPaggination([
            e.data.paggination.limit,
            1,
            e.data.paggination.count,
          ]);
        } else {
          setNoBookmarks(true);
        }
      })
      .catch(() => {
        setLoading(false);
      });
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container wrapper">
      {loading ? (
        <div className="loading">
          <div className="loader"></div>
        </div>
      ) : null}

      {noBookmarks ? <h1 className="err">You have no Bookmarks</h1> : null}
      {data.length !== 0 ? <h1>Bookmarks</h1> : null}

      {data.length !== 0 ? (
        paggination[2] > 20 ? (
          <Paggination
            changePage={changePage}
            setPage={setPage}
            paggination={paggination}
          />
        ) : null
      ) : null}

      <div id="row">
        {data.length !== 0
          ? data.map((element, index) => {
              return (
                <Card
                  key={index}
                  title={element.title}
                  cover={element.cover}
                  rating={element.rating}
                  language={element.language}
                  genre={element.genres}
                  id={element.movieCode}
                />
              );
            })
          : null}
      </div>
    </div>
  );
}
