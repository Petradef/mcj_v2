import React, { Component } from "react";
import { connect } from "react-redux";
import { loginUserAPI } from "../../../config/redux/action";
import Button from "../../../components/atoms/Button";

class Login extends Component {
  state = {
    email: "",
    password: "",
  };

  handleChangeText = (e) => {
    // console.log(e.target.id)
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleLoginSubmit = async () => {
    const { email, password } = this.state;
    const { history } = this.props;
    console.log("data before send : ", email, password);
    const res = await this.props
      .loginAPI({ email, password })
      .catch((err) => err);
    if (res) {
      console.log("Login Success");
      this.setState({
        email: "",
        password: "",
      });
      history.push("/");
    } else {
      console.log("Login Failed");
    }
  };

  render() {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <p className="auth-title">Login Page</p>
          <input
            className="input"
            placeholder="Email"
            id="email"
            type="text"
            onChange={this.handleChangeText}
          />
          <input
            className="input"
            placeholder="Password"
            id="password"
            type="password"
            onChange={this.handleChangeText}
          />
          <Button
            onClick={this.handleLoginSubmit}
            title="Login"
            loading={this.props.isLoading}
          />
          {/* <button>Go To Dashboard</button> */}
        </div>
      </div>
    );
  }
}

const reduxState = (state) => ({
  isLoading: state.isLoading,
});

const reduxDispatch = (dispatch) => ({
  loginAPI: (data) => dispatch(loginUserAPI(data)),
});

export default connect(reduxState, reduxDispatch)(Login);
