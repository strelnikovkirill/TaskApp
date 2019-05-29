import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class TableRow extends Component {

  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);
    this.monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
  }

  delete() {
    axios.get('http://localhost:4000/task/delete/' + this.props.obj._id)
         .then(console.log('Deleted'))
         .catch(err => console.log(err))
  }

  formatDate(date) {
    if (!date) return;
    let formedDate = new Date(date);
    if (!formedDate) return;
    let dateNow = new Date();
    let isExpired = dateNow.getFullYear() > formedDate.getFullYear()
      || dateNow.getMonth() > formedDate.getMonth()
      || dateNow.getDate() > formedDate.getDate();
    let day = formedDate.getDate();
    let month = this.monthNames[formedDate.getMonth()]
    let year = formedDate.getFullYear() % 100;
    if (year < 10) year = '0' + year;
    formedDate = day + ' ' + month + " '" + year

    return isExpired ? <span style={{color: "red", align: "center"}}>{formedDate}</span> : formedDate;
  }

  render() {
    return (
      <tr>
        <td>
          {this.props.obj.title}
        </td>
        <td>
          {this.props.obj.description}
        </td>
        <td>
          {this.formatDate(this.props.obj.date)}
        </td>
        <td>
          <Link to={"/edit/" + this.props.obj._id} className="btn btn-primary">Edit</Link>
        </td>
        <td>
          <button onClick={this.delete} className="btn btn-danger">Delete</button>
        </td>
      </tr>
    );
  }
}

export default TableRow;