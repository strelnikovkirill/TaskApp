import React, {Component} from 'react';
import axios from 'axios';
import './authpage.css';

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
      signInDisabled: true,
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
    this.setState({login: e.target.value,});
    this.setState({signInDisabled: !this.isFormValid()})
  }

  onChangePassword(e) {
    this.setState({password: e.target.value})
    this.setState({signInDisabled: !this.isFormValid()})
  }

  isFormValid(e) {
    let isValid = true;

    let isPasswordEmpty = this.state.password.length === 0;
    let isLoginEmpty = this.state.login.length === 0;
    let isPasswordShort = this.state.password.length < 8;

    console.log(isPasswordEmpty, isLoginEmpty, isPasswordShort)

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
    const obj = {
      login: this.state.login,
      password: this.state.password
    }
    axios.post('http://localhost:4000/auth/', obj)
      .then(res => {
        console.log(res);
        if (res.data.success) {
          localStorage.setItem('token', res.data.token);
          window.location = '/';
        } else {
          //TODO: handle error
          this.showAlert(res.data.message);
        }
      })
  }

  render() {
    return (
      <div className="container">
        <div className="alert alert-danger my-3" style={{display: this.state.alertText !== '' ? 'block' : 'none'}}
             role="alert">
          {this.state.alertText}
        </div>
        <div className="col-sm-11 col-md-9 col-lg-7 mx-auto">
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
                    disabled={this.state.signInDisabled}
                    onClick={this.onSubmit}
                  > Sign in
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}