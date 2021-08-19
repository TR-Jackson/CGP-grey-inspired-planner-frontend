import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "../../axios-planner";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const loginHandler = async () => {
    axios
      .post("/login", {
        username: username,
        password: password,
      })
      .then((res) => {
        const expires = new Date();
        expires.setDate(
          expires.getDate() + parseInt(res.data.jwt.expires.charAt(0))
        );
        console.log(expires);
        document.cookie = `token=${res.data.jwt.token}; expires=${expires}`;
        setRedirect(true);
      });
  };

  return (
    <div className="h-screen hexagons">
      {redirect && <Redirect to="/" />}
      <div className="bg-gray-100 shadow-2xl w-4/5 m-auto h-screen flex flex-col space-y-6 py-10 p-4 font-semibold">
        <div>
          <p className="mt-4">Username</p>
          <input onChange={(event) => setUsername(event.target.value)} />
        </div>
        <div>
          <p>Password</p>
          <input
            type="password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button
          className="m-auto p-2 px-10 font-semibold
           text-white bg-blue-400 rounded-md hover:bg-blue-300"
          onClick={loginHandler}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
