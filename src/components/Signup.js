import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  // const [username, setUsername] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [password2, setPassword2] = useState('');

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // Perform signup logic using the state values
    const { name, email, password } = credentials;

    const response = await fetch("http://localhost:8080/api/auth/createuser", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ name, email, password }),
    });

    const json = await response.json();
    console.log(json);
    if (json.success) {
      // save the auth token and redirect
      localStorage.setItem("token", json.authtoken);
      navigate("/");
      // props.showAlert("Successfully signed up", "success");
    } else {
      // props.showAlert("Invalid Credentials", "Danger");
    }
  };

  
  // const HandleSignup = () => {
  //   navigate("/profile-form");
  // };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value }); //... = spread operator
  };

  return (
    <>
      <section className="showcase login">
        <div className="showcase-overlay">
          <form className="form-control" onSubmit={handleFormSubmit}>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              onChange={onChange}
              aria-describedby="emailHelp"
              required
            />
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Your email address"
              // value={email}
              // onChange={(e) => setEmail(e.target.value)}
              onChange={onChange}
            aria-describedby="emailHelp"
              required
            />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Choose your password"
              // value={password}
              // onChange={(e) => setPassword(e.target.value)}
              onChange={onChange}
            minLength={5}
            required
            />
            <input
              type="confirmpassword"
              name="confirmpassword"
              id="confirmpassword"
              placeholder="Confirm your password"
              // value={password2}
              // onChange={(e) => setPassword2(e.target.value)}
              onChange={onChange}
            minLength={5}
            required
            />
            <button type="submit">
              Create Your Account
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default SignUp;
