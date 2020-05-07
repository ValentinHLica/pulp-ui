import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Consumer } from "../Context";

export default function Header() {
  const [open, setopen] = useState(false);
  return (
    <Consumer>
      {(value) => (
        <React.Fragment>
          <div id="header">
            <div className="container">
              <div className="logo">
                <Link to="/">
                  <i className="fas fa-ticket-alt"></i>PULP
                </Link>
              </div>
              <div className="header-right">
                {!value.token ? (
                  <React.Fragment>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <Link to="/user" className="account">
                      <i className="fas fa-user"></i> User
                    </Link>
                    <Link to="/bookmark">Bookmarks</Link>
                    <Link to="/" onClick={value.logOut}>
                      Log Out
                    </Link>
                  </React.Fragment>
                )}
              </div>

              <div
                className="dropdown"
                onClick={() => {
                  setopen(!open);
                }}
              >
                <i className="fas fa-bars"></i>
              </div>
            </div>
          </div>

          {open ? (
            <div
              className="header-bc"
              onClick={() => {
                setopen(!open);
              }}
            ></div>
          ) : null}

          <div className={`dropdown-menu ${open ? "dropdown-open" : null}`}>
            {!value.token ? (
              <React.Fragment>
                <Link
                  to="/login"
                  onClick={() => {
                    setopen(!open);
                  }}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => {
                    setopen(!open);
                  }}
                >
                  Register
                </Link>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Link
                  to="/bookmark"
                  onClick={() => {
                    setopen(!open);
                  }}
                >
                  Bookmarks
                </Link>
                <Link to="/" onClick={value.logOut}>
                  Log Out
                </Link>
              </React.Fragment>
            )}
          </div>
        </React.Fragment>
      )}
    </Consumer>
  );
}
