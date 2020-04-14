import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { Consumer } from "../Context";

export default function Login(props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);

  const register = (setToken, form) => {
    form.preventDefault();
    setLoading(true);
    axios
      .post(
        "https://pulp-stream.herokuapp.com/auth/register",
        {
          username,
          email,
          password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((e) => {
        setLoading(false);
        setToken(e.data.token);
        const cookies = new Cookies();
        cookies.set("token", e.data.token, { path: "/" });
        props.history.push("/");
      })
      .catch((e) => {
        setLoading(false);
        setErr(true);
      });
  };

  useEffect(() => {
    const cookie = new Cookies();
    if (cookie.get("token")) {
      props.history.push("/");
    }

    // eslint-disable-next-line
  }, []);

  return (
    <Consumer>
      {(value) => (
        <div id="register" className="container wrapper">
          <form
            className="user-form"
            onSubmit={register.bind(this, value.setToken)}
          >
            <h1>Register</h1>
            <div className="username">
              <p>Username</p>
              <input
                type="text"
                placeholder="Username..."
                required
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </div>
            <div className="email">
              <p>Email Address</p>
              <input
                type="email"
                placeholder="Email Address..."
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className={err ? "form-error" : null}
              />
            </div>
            <div className="password">
              <p>Password</p>
              <input
                type="password"
                placeholder="Password..."
                required
                onChange={(e) => {
                  setpassword(e.target.value);
                }}
              />
            </div>
            <button>
              {loading ? (
                <div className="loading">
                  <div className="loader"></div>
                </div>
              ) : (
                "Register"
              )}
            </button>
          </form>
        </div>
      )}
    </Consumer>
  );
}
