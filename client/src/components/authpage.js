import React, {Component} from 'react';
import './authpage.css';
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
import Api from '../API';


export default class AuthPage extends Component {
  constructor(props) {
    super(props);
    this.onChangeLogin = this.onChangeLogin.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.showAlert = this.showAlert.bind(this);
    this.isFormValid = this.isFormValid.bind(this);
    this.state = {
      login: '',
      password: '',
      alertText: '',
      errorLogin: '',
      errorPassword: ''
    }
  }

  showAlert(text) {
    this.setState({
      alertText: text
    })
  }

  onChangeLogin(e) {
    this.setState({login: e.target.value});
  }

  onChangePassword(e) {
    this.setState({password: e.target.value})
  }

  isFormValid(e) {
    let isValid = true;

    let isPasswordEmpty = this.state.password.length === 0;
    let isLoginEmpty = this.state.login.length === 0;
    let isPasswordShort = this.state.password.length < 8;

    if (isPasswordEmpty) {
      this.setState({
        errorPassword: "Password can't be empty"
      })
      isValid = false;
    } else if (isPasswordShort) {
      this.setState({
        errorPassword: "Password is too short"
      })
      isValid = false;
    } else {
      this.setState({errorPassword: ''})
    }
    if (isLoginEmpty) {
      this.setState({
        errorLogin: "Login can't be empty"
      })
      isValid = false;
    } else {
      this.setState({
        errorLogin: ''
      })
    }
    return isValid;
  }

  onSubmit(e) {
    e.preventDefault();
    if (!this.isFormValid()) {
      return;
    }
    const obj = {
      login: this.state.login,
      password: this.state.password
    }
    Api.auth.authorize(obj).then(res => {
      if (res.success) {
        localStorage.setItem('token', res.token);
        localStorage.setItem('login', res.login);
        window.location = '/list';
      } else {
        this.showAlert(res.message);
      }
    })
  }

  render() {
    return (
      <Container>
        <div className="col-sm-11 col-md-9 col-lg-7 mx-auto">
          <div className="p-2">
            <Alert variant="danger" show={this.state.alertText !== ''}>
              {this.state.alertText}
            </Alert>
          </div>
          <div className="card card-signin my-5">
            <div className="card-body">
              <h5 className="card-title text-center">Sign In</h5>
              <form className="form-signin">
                <div className="form-group">
                  <div className="form-label-group">
                    <label htmlFor="login">Login</label>
                    <input
                      type="text"
                      id="login"
                      className="form-control"
                      name="login"
                      placeholder="Login"
                      value={this.state.login}
                      onChange={this.onChangeLogin}
                    />
                    <span style={{color: "red"}}>{this.state.errorLogin}</span>
                  </div>
                  <div className="form-label-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      name="password"
                      placeholder="Password"
                      onChange={this.onChangePassword}
                    />
                    <span style={{color: "red"}}>{this.state.errorPassword}</span>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    value="Log In"
                    onClick={this.onSubmit}
                  > Sign in
                  </button>
                </div>
                <a href="/sign_up">Not registered yet? Sign up</a>
              </form>
            </div>
          </div>
        </div>
      </Container>
    )
  }
}