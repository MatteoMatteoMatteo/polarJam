import React, { useState } from "react";
import { connect } from "react-redux";
import { register } from "../../Redux/Actions/auth";
import { setAlert } from "../../Redux/Actions/alert";
import Alert from "./../../UseComponents/Alert/Alert";
import { Link, Redirect } from "react-router-dom";
import "./Signup.css";
import PropTypes from "prop-types";

const Signup = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  let [isSignupProcessFinished, setToTrue] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Passwords do not match!", "redAlert");
    } else {
      await register({ name, email, password });
      setToTrue((isSignupProcessFinished = true));
    }
  };

  //Redirect if signed up
  if (isAuthenticated && isSignupProcessFinished) {
    return <Redirect to="/profile" />;
  }
  return (
    <div
      className={"registerHolder"}
      initial="initial"
      animate="animate"
      exit={{ opacity: 0 }}
    >
      <h1>Sign Up</h1>
      <form className={"formHolder"} onSubmit={(e) => onSubmit(e)}>
        <Alert />
        <input
          name="name"
          type="text"
          value={name}
          onChange={(e) => onChange(e)}
          placeholder="Username"
          required
        />
        <input
          name="email"
          type="email"
          value={email}
          onChange={(e) => onChange(e)}
          placeholder="Email"
          required
        />
        <input
          name="password"
          type="password"
          value={password}
          onChange={(e) => onChange(e)}
          placeholder="Password"
          required
          minLength="6"
        />
        <input
          name="password2"
          type="password"
          value={password2}
          onChange={(e) => onChange(e)}
          placeholder="Confirm Password"
          required
          minLength="6"
        />
        <input type="submit" value="Submit" />
        <p style={{ textAlign: "left" }}>
          Already have an account?
          <Link to="/login">
            <span style={{ color: "#222433" }}> Login</span>
          </Link>
        </p>
      </form>
    </div>
  );
};

Signup.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Signup);
