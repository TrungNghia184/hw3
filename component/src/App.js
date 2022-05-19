import "./App.scss";
import React, { Component, useCallback } from "react";
import axios from "axios";
import UserInfo2 from "./components/UserInfo2";
import AlertNoInputPage from "./components/AlertNoInputPage";
import { throttle } from "lodash";
import { debounce } from "lodash";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      userData: null,
      loading: false,
    };
  }
  handleChangedInput = (e) => {
    this.setState(
      {
        input: e.target.value,
      },
      () => {
        console.log(this.state.input);
        this.getUserData();
      }
    );
  };

  async getUserData() {
    try {
      const response = await Promise.all([
        axios.get(`https://api.github.com/users/${this.state.input}`),
        this.setState({ loading: true }),
      ]);
      this.setState({
        userData: response[0],
        loading: false,
      });
    } catch (error) {
      console.error("No data yet", error);
      this.setState({
        userData: null,
      });
    }
  }
  render() {
    return (
      <div className="App">
        <div className="App__input-container">
          <label for="name-input">Find : </label>
          <input
            id="name-input"
            name="name"
            onChange={this.handleChangedInput}
            style={{ marginLeft: "30px", borderRadius: "5px", border: "none" }}
          />
        </div>
        <div className="App__user">
          <h2>User detail information</h2>
          {this.state.userData !== null ? (
            <div className="App__user-spinner">
              {this.state.loading ? (
                <div class="spinner-border" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              ) : (
                <div></div>
              )}
              <UserInfo2 userData={this.state.userData} />
            </div>
          ) : (
            <AlertNoInputPage />
          )}
        </div>
      </div>
    );
  }
}
