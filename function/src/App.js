import "./App.scss";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import UserInfo from "./components/UserInfo";
import debounce from "lodash.debounce";
import AlertNoInputPage from "./components/AlertNoInputPage";
export default function App() {
  const [userData, setUserData] = useState(null);
  const [input, setInput] = useState("");
  const [timer, setTimer] = useState(0);
  const [loading, setLoading] = useState(false);
  const debouncedChangeHandler = useCallback(
    debounce(handleChangeInput, 1000),
    []
  );
  function handleChangeInput(e) {
    const { value: nextValue } = e.target;
    setInput(nextValue);
  }
  async function getUserData() {
    try {
      const response = await Promise.all([
        axios.get(`https://api.github.com/users/${input}`),
        setLoading(true),
      ]);
      console.log(response);
      setUserData(response[0]?.data);
      setLoading(false);
    } catch (error) {
      console.error("No data yet`", error);
      setUserData(null);
    }
  }

  useEffect(() => {
    getUserData();
  }, [input, timer]);
  setInterval(() => {
    setTimer(timer + 1);
  }, 500000000);
  return (
    <div className="App">
      <div className="App__input-container">
        <label for="name-input">Find : </label>
        <input
          id="name-input"
          name="name"
          onChange={debouncedChangeHandler}
          style={{ marginLeft: "30px", borderRadius: "5px", border: "none" }}
        />
      </div>
      <div className="App__user">
        <h2>User detail information</h2>
        {userData !== null ? (
          <div className="App__user-spinner">
            {loading ? (
              <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            ) : (
              <div></div>
            )}
            <UserInfo userData={userData} />
          </div>
        ) : (
          <AlertNoInputPage />
        )}
      </div>
    </div>
  );
}
