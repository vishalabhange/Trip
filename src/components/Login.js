import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../authUtils";

const Login = () => {
  const Navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Perform login logic using the email and password state values
    const response = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const json = await response.json();
    console.log(json);

    if (json.success) {
      // Save the auth token in localStorage
      localStorage.setItem("token", json.authtoken);
      // Redirect to the desired page
      Navigate("/Showcase");
    } else {
      // Handle unsuccessful login
      // You can show an error message to the user if needed
      console.error("Login failed:", json.error);
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
      <section className="showcase login">
        <div className="showcase-overlay">
          <form className="form-control" onSubmit={handleFormSubmit}>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Your email address"
              value={credentials.email}
              onChange={onChange}
              aria-describedby="email"
              required
            />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Your password"
              value={credentials.password}
              onChange={onChange}
            />
            <button type="submit">Log In</button>
            <p>
              New User{" "}
              <a href="/signup">
                <strong>Create account</strong>
              </a>
            </p>
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
