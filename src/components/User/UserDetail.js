import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";

export default function UserDetail(props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [edit, setEdit] = useState(false);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const cookies = new Cookies();
    const token = cookies.get("token");

    if (!token) {
      props.history.push("/");
    } else {
      axios
        .get(`http://localhost:5000/auth/user`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        })
        .then((e) => {
          setUsername(e.data.data.username);
          setEmail(e.data.data.email);
        })
        .catch((e) => {
          console.log(e);
        });
    }

    // eslint-disable-next-line
  }, []);

  const submit = (form) => {
    form.preventDefault();

    const cookies = new Cookies();
    const token = cookies.get("token");

    setLoading(true);

    axios
      .put(
        "http://localhost:5000/auth/user/detail",
        {
          username,
          email,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((e) => {
        setSuccess(true);
        setLoading(false);
        setTimeout(() => {
          setSuccess(false);
        }, 2000);
      });
  };

  return (
    <div className="container wrapper">
      <form className="user-form" onSubmit={submit}>
        <div className="edit">
          <h1>User</h1>
          <p
            className={`edit-detail ${edit ? "edit-detail-on" : null}`}
            onClick={() => {
              setEdit(!edit);
            }}
          >
            Edit
          </p>
        </div>
        <div className="username">
          <p>Username</p>
          <input
            type="text"
            placeholder="Username"
            minLength="1"
            maxLength="15"
            readOnly={!edit}
            value={username}
            required
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>

        <div className="email">
          <p>Email</p>
          <input
            type="email"
            placeholder="Email"
            value={email}
            readOnly={!edit}
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>

        {edit ? (
          <button className={`${success ? "form-success" : null} `}>
            {loading ? (
              <div className="loading">
                <div className="loader"></div>
              </div>
            ) : null}

            {success ? <i className="fas fa-check"></i> : null}

            {!loading && !success ? "Save" : null}
          </button>
        ) : null}

        <div className="user-password">
          <Link to="/user/password">Change Password</Link>
        </div>
      </form>
    </div>
  );
}
