import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Create from './components/task/create';
import Edit from './components/task/edit';
import List from './components/task/list';
import Auth from './components/auth';
import Profile from './components/profile';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
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
                <li className="nav-item">
                  <Link to={'/auth'} className="nav-link">Auth</Link>
                </li>
              </ul>
            </div>
          </nav>
          <br/>
          <Switch>
            <Route exact path='/create' component={ Create }/>
            <Route path='/edit/:id' component={ Edit }/>
            <Route path='/list' component={ List }/>
            <Route path='/auth' component={ Auth }/>
            <Route path='/profile' component={ Profile }/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;