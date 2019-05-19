import React, { Component } from 'react';
import axios from 'axios';
import TableRow from './tableRow.js';

export default class List extends Component {

  constructor(props) {
    super(props);
    this.state = { tasks: [] };
  }

  componentDidUpdate() {
    axios.get('http://localhost:4000/task')
         .then(response => {
            this.setState({ tasks: response.data });
         })
         .catch(function (error) {
            console.log(error);
         })
  }

  componentDidMount() {
    axios.get('http://localhost:4000/task')
         .then(response => {
            this.setState({ tasks: response.data });
         })
         .catch(function (error) {
            console.log(error);
         })
  }

  tabRow() {
    return this.state.tasks.map(function(object, item) {
      return <TableRow obj={object} key={item}/>;
    });
  }

  render() {
    return (
      <div>
        <h3 align="center">My tasks</h3>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Period of execution</th>
              <th colSpan="2">Action</th>
            </tr>
          </thead>
          <tbody>
            { this.tabRow() }
          </tbody>
        </table>
      </div>
    );
  }
}