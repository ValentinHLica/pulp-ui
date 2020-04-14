import React from "react";
import notFoundGif from "../assets/img/notFound.gif";

export default function NotFound() {
  return (
    <div className="not-found-page container wrapper">
      <h1>404 Page Not Found</h1>
      <div className="not-found-img">
        <img src={notFoundGif} alt="John Travolta Lost" />
      </div>
    </div>
  );
}
