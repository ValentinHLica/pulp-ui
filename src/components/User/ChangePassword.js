import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import axios from "axios";

export default function ChangePassword(props) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [showCurrentPassword, setshowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [err, setErr] = useState(false);

  useEffect(() => {
    const cookies = new Cookies();
    const token = cookies.get("token");

    if (!token) {
      props.history.push("/");
    }

    // eslint-disable-next-line
  }, []);

  const submit = (form) => {
    form.preventDefault();

    const cookies = new Cookies();
    const token = cookies.get("token");

    setLoading(true);
    setSuccess(false);
    setErr(false);

    axios
      .put(
        "https://pulp-stream.herokuapp.com/auth/changepassword",
        {
          currentPassword,
          newPassword,
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

        setCurrentPassword("");
        setNewPassword("");
      })
      .catch(() => {
        setLoading(false);
        setErr(true);
        setTimeout(() => {
          setErr(false);
        }, 2000);
      });
  };

  return (
    <div className="container wrapper">
      <form onSubmit={submit} className="user-form">
        <h1>Change Password</h1>
        <div className="password">
          <p>Current Password</p>
          <span>
            <input
              type={showCurrentPassword ? "text" : "password"}
              placeholder="Current Password"
              required
              value={currentPassword}
              onChange={(e) => {
                setCurrentPassword(e.target.value);
              }}
              className={err ? "form-error" : null}
            />
            <div
              onClick={() => {
                setshowCurrentPassword(!showCurrentPassword);
              }}
            >
              <i
                className={`fas fa-${
                  showCurrentPassword ? "eye-slash" : "eye"
                }`}
              ></i>
            </div>
          </span>
          {err ? <p className="wrong-password">Wrong Password</p> : null}
        </div>

        <div className="password">
          <p>New Password</p>
          <span>
            <input
              type={showNewPassword ? "text" : "password"}
              placeholder="New Password"
              required
              minLength="6"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
            />
            <div
              onClick={() => {
                setShowNewPassword(!showNewPassword);
              }}
            >
              <i
                className={`fas fa-${showNewPassword ? "eye-slash" : "eye"}`}
              ></i>
            </div>
          </span>
        </div>

        <button className={`${success ? "form-success" : null} `}>
          {loading ? (
            <div className="loading">
              <div className="loader"></div>
            </div>
          ) : null}

          {success ? <i className="fas fa-check"></i> : null}

          {!loading && !success ? "Save" : null}
        </button>
      </form>
    </div>
  );
}
