import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Create from './components/task/create';
import Edit from './components/task/edit';
import List from './components/task/list';
import Register from './components/register';
import AuthPage from './components/authpage';
import Profile from './components/profile';

class App extends Component {
  constructor(props) {
    super(props);

    this.logOut = this.logOut.bind(this);
  }

  logOut() {
    ['token', 'login'].forEach(e => localStorage.removeItem(e));
    window.location = '/';
  }

  render() {
    let token = localStorage.getItem('token');
    if (token != null) {
      return (
        <Router>
          <div className="container-fluid">
            <nav className="navbar navbar-expand-sm navbar-dark bg-primary">
              <Link to={'/'} className="navbar-brand">Task app</Link>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item">
                    <Link to={'/list'} className="nav-link">My tasks</Link>
                  </li>
                  <li className="nav-item">
                    <Link to={'/create'} className="nav-link">Add task</Link>
                  </li>
                  <li className="nav-item">
                    <Link to={'/profile'} className="nav-link">Profile</Link>
                  </li>
                </ul>
              <ul className="navbar-nav">
                  <li className="nav-item">
                    Logged in as {localStorage.getItem('login')}
                  </li>
                  <li className="nav-item">
                    <button className="btn btn-outline-primary" onClick={this.logOut}>Log out</button>
                  </li>
                </ul>
              </div>
            </nav>
            <br/>
            <div className="container">
              <Switch>
                <Route exact path='/create' component={Create}/>
                <Route path='/edit/:id' component={Edit}/>
                <Route path='/list' component={List}/>
                <Route path='/auth' component={Register}/>
                <Route path='/profile' component={Profile}/>
              </Switch>
            </div>
          </div>
        </Router>
      );
    } else {
      //TODO: check token on backend
      return (
        <div>
          <AuthPage/>
          <Register/>
        </div>
      )
    }
  }
}

export default App;