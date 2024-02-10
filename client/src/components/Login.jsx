import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login, setUserDetails } from "../store/index";

const Login = () => {
  const [studID, setStudID] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const studentEmails = {
    "student1@example.com": 1,
    "student2@example.com": 2,
    "student3@example.com": 3,
    "student4@example.com": 4,
  };

  useEffect(() => {
    if (studID !== null) {
      axios
        .get(`http://localhost:5000/user/${studID}/details`)
        .then((response) => {
          // alert("Logged In Successfully");
          dispatch(setUserDetails(response.data));
          dispatch(login());
        })
        .catch((error) =>
          console.error("Error fetching course details:", error)
        );
    }
  }, [studID, dispatch]);

  const fetchUserDetails = () => {
    const msg = document.getElementById("l-btn");
    msg.innerHTML = "Loading";
    if (studentEmails[username] && password === "admin") {
      setStudID(studentEmails[username]);
    } else {
      alert(`Wrong credentials
      TIP: Available usernames are,
        student1@example.com
        student2@example.com
        student3@example.com
        student4@example.com
      Password: admin
      `);
      msg.innerHTML = "Login";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex justify-center items-center ">
        <div className="">
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h1 className="text-3xl mb-3 font-semibold text-center">Login</h1>
            <input
              className="block w-full mb-4 px-3 py-2 border rounded"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className="block w-full mb-4 px-3 py-2 border rounded"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              id="l-btn"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={fetchUserDetails}
            >
              Login
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div className="w-full max-w-xl">
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h1 className="text-3xl mb-3 font-semibold text-center">
              Available Users
            </h1>
            <div>Name: Student 1, Email: student1@example.com</div>
            <div>Name: Student 2, Email: student3@example.com</div>
            <div>Name: Student 3, Email: student3@example.com</div>
            <div>Name: Student 4, Email: student4@example.com</div>
            <div>Password: admin</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
