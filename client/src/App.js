import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Create from './components/task/create';
import Edit from './components/task/edit';
import List from './components/task/list';
import Register from './components/register';
import AuthPage from './components/authpage';
import Profile from './components/profile';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/es/Container";
import NavbarBrand from "react-bootstrap/NavbarBrand";
import NavDropdown from "react-bootstrap/NavDropdown";

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
          <Navbar bg="primary" expand="sm">
            <NavbarBrand to={'/'}>Task app</NavbarBrand>
            <Navbar.Collapse id="collapse">
              <Nav className="mr-auto">
                <Nav.Item><Link to={'/list'} className="nav-link">My tasks</Link></Nav.Item>
                <Nav.Item><Link to={'/create'} className="nav-link">Add task</Link></Nav.Item>
                <Nav.Item><Link to={'/profile'} className="nav-link">Profile</Link></Nav.Item>
              </Nav>
              <Nav>
                <NavDropdown title={"Logged in as " + localStorage.getItem('login')} id="nav-dropdown">
                  <NavDropdown.Item onClick={this.logOut}>Log out</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
            <br/>
          </Navbar>
          <Container className="p-3">
            <Switch>
              <Route default exact path='/create' component={Create}/>
              <Route path='/edit/:id' component={Edit}/>
              <Route path='/list' component={List}/>
              <Route path='/profile' component={Profile}/>
            </Switch>
          </Container>
        </Router>
      );
    } else {
      //TODO: check token on backend
      return (
        <Router>
          <Switch>
            <Route exact path='/' component={AuthPage}/>
            <Route exact path='/sign_up' component={Register}/>
          </Switch>
        </Router>
      )
    }
  }
}

export default App;