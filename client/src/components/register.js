import React, {Component} from 'react';
import Api from '../API';

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeSecondName = this.onChangeSecondName.bind(this);
    this.onChangeLogin = this.onChangeLogin.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangePasswordRepeat = this.onChangePasswordRepeat.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.updateSignUpState = this.updateSignUpState.bind(this);
    this.state = {
      firstName: '',
      secondName: '',
      login: '',
      password: '',
      passwordRepeat: '',
      errorFirstName: '',
      errorSecondName: '',
      errorLogin: '',
      errorPassword: '',
      errorPasswordRepeat: '',
    }
  }

  updateSignUpState() {
    this.setState({
      isSignUpDisabled: this.isFormValid()
    })
  }

  isFormValid() {
    let errorFirstName = '';
    let errorSecondName = '';
    let errorLogin = '';
    let errorPassword = '';
    let errorPasswordRepeat = '';
    let isValid = true;
    if (this.state.firstName === '') {
      errorFirstName = 'First name can\'t be empty';
      isValid = false;
    }
    if (this.state.secondName === '') {
      errorSecondName = 'Second name can\'t be empty';
      isValid = false;
    }
    if (this.state.login === '') {
      errorLogin = 'Login can\'t be empty';
      isValid = false;
    }
    if (this.state.password === '') {
      errorPassword = 'Password can\'t be empty';
      isValid = false;
    } else if (this.state.password.length < 8) {
      errorPassword = 'Password is too short';
      isValid = false;
    } else if (this.state.password !== this.state.passwordRepeat) {
      errorPasswordRepeat = 'Password does not match';
      isValid = false;
    }
    this.setState({errorFirstName, errorSecondName, errorLogin, errorPassword, errorPasswordRepeat})

    return isValid;
  }

  onChangeFirstName(e) {
    this.setState({
      firstName: e.target.value
    });
  }

  onChangeSecondName(e) {
    this.setState({
      secondName: e.target.value
    });
  }

  onChangeLogin(e) {
    this.setState({
      login: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    })
  }

  onChangePasswordRepeat(e) {
    this.setState({
      passwordRepeat: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();
    if (!this.isFormValid()) {
      return;
    }
    const obj = {
      firstName: this.state.firstName,
      secondName: this.state.secondName,
      login: this.state.login,
      password: this.state.password,
      passwordRepeat: this.state.passwordRepeat
    };
    Api.person.create(obj).then(res => {
      if (res.success) {
        localStorage.token = res.token;
        localStorage.login = res.login;
        window.location = '/list';
      } else {
        this.setState({
          errorLogin: res.message
        })
      }
    })
  }

  render() {
    return (<div className="container">
        <div className="col-sm-11 col-md-9 col-lg-7 mx-auto">
          <div className="card card-signin my-5">
            <div className="card-body">
              <h5 className="card-title text-center">Sign Up</h5>
              <form className="form-signin">
                <div className="form-label-group">
                  <label>First name:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.firstName}
                    onChange={this.onChangeFirstName}
                  />
                  <span style={{color: "red"}}>{this.state.errorFirstName}</span>
                </div>
                <div className="form-label-group">
                  <label>Second name:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.secondName}
                    onChange={this.onChangeSecondName}
                  />
                  <span style={{color: "red"}}>{this.state.errorSecondName}</span>
                </div>
                <div className="form-label-group">
                  <label>Login:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.login}
                    onChange={this.onChangeLogin}
                  />
                  <span style={{color: "red"}}>{this.state.errorLogin}</span>
                </div>
                <div className="form-label-group">
                  <label>Password:</label>
                  <input type="password"
                         className="form-control"
                         value={this.state.password}
                         onChange={this.onChangePassword}
                  />
                  <span style={{color: "red"}}>{this.state.errorPassword}</span>
                </div>
                <div className="form-label-group">
                  <label>Repeat password:</label>
                  <input type="password"
                         className="form-control"
                         value={this.state.passwordRepeat}
                         onChange={this.onChangePasswordRepeat}
                  />
                  <span style={{color: "red"}}>{this.state.errorPasswordRepeat}</span>
                </div>
                <div className="form-label-group">
                  <button type="submit"
                          className="btn btn-primary"
                          onClick={this.onSubmit}
                  >Sign Up
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