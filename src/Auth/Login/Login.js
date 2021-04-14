import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../Redux/Actions/auth";
import Alert from "./../../UseComponents/Alert/Alert";
import PropTypes from "prop-types";
import "./Login.css";

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  let [isLoginProcessFinished, setToTrue] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
    setToTrue((isLoginProcessFinished = true));
  };

  //Redirect if logged in
  if (isAuthenticated && isLoginProcessFinished) {
    return <Redirect exact to="/profile" />;
  }
  return (
    <div
      className={"registerHolder"}
      initial="initial"
      animate="animate"
      exit={{ opacity: 0 }}
    >
      <h1 style={{ marginBottom: "0px" }}>Login</h1>
      <form className={"formHolder"} onSubmit={(e) => onSubmit(e)}>
        <div className="alertSpace">
          <Alert />
        </div>

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
        <input type="submit" value="Login" />

        <p style={{ textAlign: "left" }}>
          Don't have an account?
          <Link to="/signup">
            <span style={{ color: "#222433" }}> Sign Up</span>
          </Link>
        </p>
      </form>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
