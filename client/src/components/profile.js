import React, {Component} from 'react';
import Api from '../API';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.fetchUser = this.fetchUser.bind(this);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeSurname = this.onChangeSurname.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      name: '',
      surname: '',
      formName: '',
      formSurname: ''
    }
  }

  fetchUser() {
    let login = localStorage.getItem('login');
    Api.person.read(login).then(res => {
      console.log(res);
      this.setState({
        name: res.firstName,
        surname: res.secondName,
        formName: res.firstName,
        formSurname: res.secondName
      })
    });
  }

  componentDidMount() {
    this.fetchUser();
  }

  onChangeFirstName(e) {
    this.setState({
      formName: e.target.value
    })
  }

  onChangeSurname(e) {
    this.setState({
      formSurname: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();
    let login = localStorage.getItem('login');
    let obj = {
      firstName: this.state.formName,
      secondName: this.state.formSurname
    }
    Api.person.update(login, obj).then(res => {
      console.log(res);
    })
  }

  render() {
    return (
      <div>
        <h1>Profile</h1>
        <div>Name: {this.state.name} </div>
        <div>Surname: {this.state.surname} </div>
        <h2>Edit</h2>
        <form className="form-signin">
          <div className="form-group">
            {/*<div className="form-label-group">
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
            </div>*/}
            <div className="form-label-group">
              <label htmlFor="password">Name</label>
              <input
                type="text"
                id="name"
                className="form-control"
                name="name"
                placeholder="Name"
                value={this.state.formName}
                onChange={this.onChangeFirstName}
              />
            </div>
            <div className="form-label-group">
              <label htmlFor="password">Surname</label>
              <input
                type="text"
                id="surname"
                className="form-control"
                name="surname"
                placeholder="Surname"
                value={this.state.formSurname}
                onChange={this.onChangeSurname}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={this.onSubmit}
            > Submit
            </button>
          </div>
        </form>
      </div>
    )
  }
}