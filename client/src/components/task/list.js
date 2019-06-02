import React, {Component} from 'react';
import Api from '../../API';
import TableRow from './tableRow.js';

export default class List extends Component {

  constructor(props) {
    super(props);
    this.state = {tasks: []};
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(prevState);
    // TODO: someshit happens here with lifecycle hook, need fix
    if (prevState.tasks.length !== this.state.tasks.length) {
      Api.task.read().then(response => {
        this.setState({tasks: response});
      }).catch(function (error) {
        console.log(error);
      })
    }
  }

  componentDidMount() {
    Api.task.read().then(response => {
      this.setState({tasks: response});
    }).catch(function (error) {
      console.log(error);
    })
  }

  tabRow() {
    return this.state.tasks.map((object, item) => <TableRow obj={object} key={item}/>);
  }

  render() {
    return (
      <div>
        <h3 align="center">My tasks</h3>
        <table className="table table-striped" style={{marginTop: 20}}>
          <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Period of execution</th>
            <th colSpan="2">Action</th>
          </tr>
          </thead>
          <tbody>
          {this.tabRow()}
          </tbody>
        </table>
      </div>
    );
  }
}