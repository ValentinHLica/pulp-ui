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
  const [viewPassword, setViewPassword] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);

  const register = (setToken, form) => {
    form.preventDefault();
    setLoading(true);
    axios
      .post(
        "https://portfolio-server-vl.herokuapp.com/auth/register",
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
        setRegisterSuccess(true);
        setTimeout(() => {
          props.history.push("/");
        }, 1000);
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
                minLength="5"
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
              <span>
                <input
                  type={viewPassword ? "text" : "password"}
                  placeholder="Password..."
                  required
                  onChange={(e) => {
                    setpassword(e.target.value);
                  }}
                  minLength="8"
                />
                <div
                  onClick={() => {
                    setViewPassword(!viewPassword);
                  }}
                >
                  <i
                    className={`fas fa-${viewPassword ? "eye-slash" : "eye"}`}
                  ></i>
                </div>
              </span>
            </div>
            <button className={registerSuccess ? "form-success" : null}>
              {loading ? (
                <div className="loading">
                  <div className="loader"></div>
                </div>
              ) : registerSuccess ? (
                <i className="fas fa-check"></i>
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
