import React, { useState, useEffect } from "react";
import axios from "axios";
import { Consumer } from "../Context";
import Cookies from "universal-cookie";

export default function ResetPassword(props) {
  const [newPassword, setNewPassword] = useState("");
  const [repeatNewPassword, setrepeatNewPassword] = useState("");

  const [invalideToken, setinvalideToken] = useState("checking");

  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [err, setErr] = useState(false);
  const [success, setSuccess] = useState(false);

  // Check if Token is valid
  useEffect(() => {
    axios
      .get(
        `https://portfolio-server-vl.herokuapp.com/pulp/auth/checkresetpassword/${props.match.params.token}`
      )
      .then((e) => {
        setPageLoading(false);
        setinvalideToken("valid");
      })
      .catch((e) => {
        setPageLoading(false);
        setinvalideToken("invalid");
      });

    // eslint-disable-next-line
  }, []);

  const submit = (setToken, form) => {
    form.preventDefault();
    setLoading(true);
    setErr(false);
    setSuccess(false);

    if (newPassword === repeatNewPassword) {
      axios
        .put(
          `https://portfolio-server-vl.herokuapp.com/pulp/auth/resetpassword/${props.match.params.token}`,
          {
            password: newPassword,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((e) => {
          setLoading(false);
          setErr(false);
          setSuccess(true);
          setTimeout(() => {
            const cookies = new Cookies();
            cookies.set("token", e.data.token, { path: "/" });
            setToken(e.data.token);
            props.history.push("/");
          }, 1000);
        });
    } else {
      setLoading(false);
      setErr(true);
      setTimeout(() => {
        setErr(false);
      }, 2000);
    }
  };

  return (
    <Consumer>
      {(value) => (
        <div className="continer wrapper">
          {invalideToken === "valid" ? (
            <form
              className="user-form"
              onSubmit={submit.bind(this, value.setToken)}
            >
              <h1>Reset Password</h1>

              <div className="password">
                <p>New Password</p>
                <input
                  type="text"
                  placeholder="New Password"
                  className={err ? "form-error" : null}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                  }}
                  required
                  value={newPassword}
                />
              </div>

              <div className="password">
                <p>Repeat New Password</p>
                <input
                  type="text"
                  placeholder="Repeat New Password"
                  className={err ? "form-error" : null}
                  onChange={(e) => {
                    setrepeatNewPassword(e.target.value);
                  }}
                  required
                  value={repeatNewPassword}
                />
              </div>

              <button
                className={`${success ? "form-success" : null} ${
                  err ? "btn-error" : null
                }`}
              >
                {loading ? (
                  <div className="loading">
                    <div className="loader"></div>
                  </div>
                ) : null}

                {success ? <i className="fas fa-check"></i> : null}
                {err ? <i className="fas fa-exclamation-triangle"></i> : null}

                {!loading && !success && !err ? "GO" : null}
              </button>

              {err ? (
                <p className="same-password">
                  Please make shure that both passwords are the same
                </p>
              ) : null}
            </form>
          ) : null}

          {pageLoading ? (
            <div className="loading">
              <div className="loader"></div>
            </div>
          ) : null}

          {invalideToken === "invalid" ? (
            <h1 className="invalide-token">Invalide Token</h1>
          ) : null}
        </div>
      )}
    </Consumer>
  );
}
