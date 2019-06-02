import React, {Component} from 'react';
import Api from '../API';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.fetchUser = this.fetchUser.bind(this);
    this.state = {
      name: '',
      surname: '',
    }
  }

  fetchUser() {
    let login = localStorage.getItem('login');
    Api.person.read(login).then(res => {
      console.log(res);
      this.setState({
        name: res.firstName,
        surname: res.secondName
      })
    });
  }

  componentDidMount() {
    this.fetchUser();
  }

  render() {
    return (
      <div>
        <h1>Profile</h1>
        <div>Name: {this.state.name} </div>
        <div>Surname: {this.state.surname} </div>
      </div>
    )
  }
}