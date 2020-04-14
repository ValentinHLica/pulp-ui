import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { Consumer } from "../Context";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);

  const change = (target, e) => {
    if (target === "email") {
      setEmail(e.target.value);
    }
    if (target === "password") {
      setPassword(e.target.value);
    }
  };

  const login = (setToken, form) => {
    form.preventDefault();
    setLoading(true);
    axios
      .post(
        "https://pulp-stream.herokuapp.com/auth/login",
        {
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
        <div id="login" className="container wrapper">
          <form
            className="user-form"
            onSubmit={login.bind(this, value.setToken)}
          >
            <h1>Login</h1>
            <div className="email">
              <p>Email Address</p>
              <input
                type="email"
                placeholder="Email Address..."
                required
                onChange={change.bind(this, "email")}
                className={err ? "form-error" : null}
              />
            </div>
            <div className="password">
              <p>Password</p>
              <input
                type="password"
                placeholder="Password..."
                required
                onChange={change.bind(this, "password")}
                className={err ? "form-error" : null}
              />
            </div>

            <button>
              {loading ? (
                <div className="loading">
                  <div className="loader"></div>
                </div>
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>
      )}
    </Consumer>
  );
}
