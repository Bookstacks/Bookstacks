import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { auth } from "../store";
import { toast } from "react-toastify";


const AuthForm = props => {
  const { name, displayName, handleSubmit, error } = props;

  return (
    <div className="auth">
      <form onSubmit={handleSubmit} name={name}>
        <div>
          <label
            style={{
              padding: ".75rem",
              fontSize: "17pt"
            }}
            htmlFor="email"
          >
            <small>Email :</small>
          </label>
          <input name="email" type="text" />
        </div>
        <div>
          <label
            style={{
              padding: ".75rem",
              fontSize: "17pt"
            }}
            htmlFor="password"
          >
            <small>Password :</small>
          </label>
          <input name="password" type="password" />
        </div>
        <div>
          <button style={{ marginLeft: "15px" }} type="submit">
            {displayName}
          </button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
      <a href="/auth/google">{displayName} with Google</a>
    </div>
  );
};


const mapLogin = state => {
  return {
    name: "login",
    displayName: "Login",
    error: state.user.error
  };
};

const mapSignup = state => {
  return {
    name: "signup",
    displayName: "Sign Up",
    error: state.user.error
  };
};

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      dispatch(auth(email, password, formName));
      toast.info("Welcome to BookStacks!", {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  };
};

export const Login = connect(
  mapLogin,
  mapDispatch
)(AuthForm);
export const Signup = connect(
  mapSignup,
  mapDispatch
)(AuthForm);

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
};
