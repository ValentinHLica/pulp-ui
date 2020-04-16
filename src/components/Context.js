import React, { Component } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

const Context = React.createContext();
export default class Provider extends Component {
  state = {
    data: [],
    query: "",
    changeQuery: (e) => {
      this.setState({ query: e.target.value });
    },
    searchOptions: ["all", "all", 0, "date_added"],
    changeOptions: (target, option) => {
      const options = [...this.state.searchOptions];
      options[option] = target;
      this.setState({ searchOptions: options });
      setTimeout(() => {
        this.state.searchMovies(null, null);
      }, 100);
    },
    paggination: [20, 1, 0],
    changePage: (bool) => {
      const paggination = [...this.state.paggination];

      let [limit, page, count] = paggination;
      if (bool) {
        if (Math.ceil(count / limit) > page) {
          paggination[1]++;
        }
      } else {
        if (page >= 2) {
          paggination[1]--;
        }
      }
      this.setState({ paggination: [...paggination], data: [], loading: true });

      const options = this.state.searchOptions;
      const query = this.state.query;
      axios
        .get(
          `https://pulp-stream.herokuapp.com/search?query=${query}&limit=${paggination[0]}&page=${paggination[1]}&quality=${options[0]}&genre=${options[1]}&rating=${options[2]}&sort=${options[3]}`
        )
        .then((e) => {
          this.setState({
            data: [...e.data.data],
            loading: false,
          });
        })

        .catch(() => {
          this.setState({
            loading: false,
            err: true,
          });
        });
    },
    setPage: (e) => {
      this.setState({ data: [], loading: true });
      const paggination = [...this.state.paggination];
      paggination[1] = e;

      const options = this.state.searchOptions;
      const query = this.state.query;
      axios
        .get(
          `https://pulp-stream.herokuapp.com/search?query=${query}&limit=${paggination[0]}&page=${paggination[1]}&quality=${options[0]}&genre=${options[1]}&rating=${options[2]}&sort=${options[3]}`
        )
        .then((e) => {
          this.setState({
            data: [...e.data.data],
            loading: false,
            paggination: [...paggination],
          });
        })

        .catch(() => {
          this.setState({
            loading: false,
            err: true,
          });
        });
    },
    loading: false,
    err: false,
    searchMovies: (type, form) => {
      if (type === "form") {
        form.preventDefault();
      }

      this.setState({ data: [], loading: true, paggination: [20, 1, 0] });

      const options = this.state.searchOptions;
      const query = this.state.query;
      const paggination = [20, 1, 0];

      axios
        .get(
          `https://pulp-stream.herokuapp.com/search?query=${query}&limit=${paggination[0]}&page=${paggination[1]}&quality=${options[0]}&genre=${options[1]}&rating=${options[2]}&sort=${options[3]}`
        )
        .then((e) => {
          paggination[2] = e.data.paggination.count;
          this.setState({
            data: [...e.data.data],
            loading: false,
            paggination: [...paggination],
          });
        })

        .catch(() => {
          this.setState({
            loading: false,
            err: true,
          });
        });
    },
    token: false,
    setToken: (e) => {
      this.setState({ token: e });
    },
    logOut: () => {
      const cookies = new Cookies();
      cookies.remove("token");
      console.log(cookies.get("token"));

      this.setState({ token: false });
    },
  };

  componentDidMount() {
    const cookies = new Cookies();
    const token = cookies.get("token");
    if (token) {
      this.setState({ token });
    }
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
