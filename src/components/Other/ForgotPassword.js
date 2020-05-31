import React, { useState } from "react";
import axios from "axios";

export default function ForgotPassword() {
  const [email, setemail] = useState("");
  const [err, seterr] = useState(false);
  const [loading, setloading] = useState(false);
  const [success, setsuccess] = useState(false);

  const submit = (form) => {
    form.preventDefault();
    setloading(true);
    seterr(false);
    setsuccess(false);

    axios
      .post(
        "http://localhost:5000/auth/forgotpassword",
        {
          email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((e) => {
        setloading(false);
        seterr(false);
        setsuccess(true);
      })
      .catch((e) => {
        setloading(false);
        seterr(true);
        setsuccess(false);
      });
  };

  return (
    <div className="container wrapper">
      <form onSubmit={submit} className="user-form">
        <h1>Reset your password</h1>
        <div className="email">
          <p>
            Enter your user account's verified email address and we will send
            you a password reset link.
          </p>
          <input
            type="email"
            placeholder="Email address..."
            className={`"forgot-password" ${err ? "form-error" : null}`}
            value={email}
            onChange={(e) => {
              setemail(e.target.value);
            }}
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

        {success ? (
          <p className="success-text">Please check your email address</p>
        ) : null}

        {err ? <p className="success-text">Email Does not exist</p> : null}
      </form>
    </div>
  );
}
