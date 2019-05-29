import React, { Component } from 'react';
import axios from 'axios';

export default class Auth extends Component {
  constructor(props) {
    super(props);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeSecondName = this.onChangeSecondName.bind(this);
    this.onChangeLogin = this.onChangeLogin.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangePasswordRepeat = this.onChangePasswordRepeat.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      firstName: '',
      secondName: '',
      login: '',
      password: '',
      passwordRepeat:'',
      errorFirstName: '',
      errorSecondName: '',
      errorLogin: '',
      errorPassword: '',
      errorPasswordRepeat: ''
    }
  }

  isValidForm() {
    let errorFirstName = '';
    let errorSecondName = '';
    let errorLogin = '';
    let errorPassword = '';
    let errorPasswordRepeat = '';
    let isValid = true;
    if (this.state.firstName === '') {
      errorFirstName = 'First name error';
      isValid = false;
    }
    if (this.state.secondName === '') {
      errorSecondName = 'Second name error';
      isValid = false;
    }
    if (this.state.login === '') {
      errorLogin = 'Login error';
      isValid = false;
    }
    if (this.state.password === '') {
      errorPassword = 'Password error';
      isValid = false;
    }
    else if (this.state.password.length < 5) {
      errorPassword = 'Length password error';
      isValid = false;
    }
    else if (this.state.password !== this.state.passwordRepeat) {
      errorPasswordRepeat = 'Password repeat error';
      isValid = false;
    }
    this.setState({errorFirstName})
    this.setState({errorSecondName})
    this.setState({errorLogin})
    this.setState({errorPassword})
    this.setState({errorPasswordRepeat})

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
    if (!this.isValidForm()) return;
    const obj = {
      firstName: this.state.firstName,
      secondName: this.state.secondName,
      login: this.state.login,
      password: this.state.password,
      passwordRepeat: this.state.passwordRepeat
    };
    axios.post('http://localhost:4000/person/add', obj)
        .then(res => console.log(res.data));
    this.setState({
      firstName: '',
      secondName: '',
      login: '',
      password: '',
      passwordRepeat: '',
      errorFirstName: '',
      errorSecondName: '',
      errorLogin: '',
      errorPassword: '',
      errorPasswordRepeat: ''
    })
  }

  render() {
    return (
      <div style={{marginTop: 10}}>
        <h3>Add person</h3>
        <form onSubmit={this.onSubmit}>
        <div className="form-group">
            <label>First name:</label>
            <input
              type="text"
              className="form-control"
              value={this.state.firstName}
              onChange={this.onChangeFirstName}
            />
            <span style={{color: "red"}}>{this.state.errorFirstName}</span>
          </div>
          <div className="form-group">
            <label>Second name:</label>
            <input
              type="text"
              className="form-control"
              value={this.state.secondName}
              onChange={this.onChangeSecondName}
            />
            <span style={{color: "red"}}>{this.state.errorSecondName}</span>
          </div>
          <div className="form-group">
            <label>Login:</label>
            <input
              type="text"
              className="form-control"
              value={this.state.login}
              onChange={this.onChangeLogin}
            />
            <span style={{color: "red"}}>{this.state.errorLogin}</span>
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input type="password"
              className="form-control"
              value={this.state.password}
              onChange={this.onChangePassword}
            />
            <span style={{color: "red"}}>{this.state.errorPassword}</span>
          </div>
          <div className="form-group">
            <label>Repeat password:</label>
            <input type="password"
              className="form-control"
              value={this.state.passwordRepeat}
              onChange={this.onChangePasswordRepeat}
            />
            <span style={{color: "red"}}>{this.state.errorPasswordRepeat}</span>
          </div>
          <div className="form-group">
            <input type="submit" value="Save" className="btn btn-primary"/>
          </div>
        </form>
      </div>
    )
  }
}