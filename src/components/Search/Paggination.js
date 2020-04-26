import React from "react";

export default function Paggination(props) {
  const paggination = ([limit, page, count], setPage) => {
    const all = [];
    for (let i = 0; i < 3; i++) {
      if (i === 0) {
        all.push(
          <li
            key={i}
            className="current"
            onClick={setPage.bind(this, page + i)}
          >
            {page + i}
          </li>
        );
      } else {
        if (Math.ceil(count / limit) >= page + i) {
          all.push(
            <li key={i} onClick={setPage.bind(this, page + i)}>
              {page + i}
            </li>
          );
        }
      }
    }
    return all;
  };
  return (
    <div className="paggination">
      <ul>
        <li className="arrow" onClick={props.changePage.bind(this, false)}>
          <i className="fas fa-angle-left"></i>
        </li>

        {props.paggination[1] >= 3 ? (
          <React.Fragment>
            <li onClick={props.setPage.bind(this, 1)}>1</li>
            <li>...</li>
          </React.Fragment>
        ) : null}

        {props.paggination[1] >= 2 ? (
          <li onClick={props.setPage.bind(this, props.paggination[1] - 1)}>
            {props.paggination[1] - 1}
          </li>
        ) : null}

        {paggination(props.paggination, props.setPage)}

        <li className="arrow" onClick={props.changePage.bind(this, true)}>
          <i className="fas fa-angle-right"></i>
        </li>
      </ul>
    </div>
  );
}
