import React, { Component } from 'react';
import axios from 'axios';

export default class Edit extends Component {

  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      title: '',
      description: '',
      date: '',
      errorTitle: '',
      errorkDescription: '',
      errorDate: ''
    }
  }

  componentDidMount() {
    axios.get('http://localhost:4000/task/edit/' + this.props.match.params.id)
         .then(response => {
          this.setState({
            title: response.data.title,
            description: response.data.description,
            date: response.data.date });
         })
         .catch(function (error) {
            console.log(error);
         })
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }

  onChangeDate(e) {
    this.setState({
      date: e.target.value
    })
  }

  isValidForm() {
    let errorTitle = '';
    let errorDate = '';
    let isValid = true;
    if (this.state.title === '') {
      errorTitle = 'Title error';
      isValid = false;
    }
    if (this.state.date === '') {
      errorDate = 'Date error';
      isValid = false;
    }
    this.setState({errorTitle})
    this.setState({errorDate})

    return isValid;
  }

  onSubmit(e) {
    e.preventDefault();
    if (!this.isValidForm()) return;
    const obj = {
      title: this.state.title,
      description: this.state.description,
      date: this.state.date
    };
    axios.post('http://localhost:4000/task/update/' + this.props.match.params.id, obj)
         .then(res => console.log(res.data));
    this.props.history.push('/list');
  }

  formatDate(date) {
    if (!date) return;
    let formedDate = new Date(date);
    if (!formedDate) return;
    let day = formedDate.getDate();
    let month = formedDate.getMonth() + 1;
    if (day < 10) day = '0' + day;
    if (month < 10) month = '0' + month;
    return formedDate.getFullYear() + '-' + month + '-' + day;
  }

  render() {
    return (
      <div style={{marginTop: 10}}>
        <h3>Edit task</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Title:</label>
            <input
              type="text"
              className="form-control"
              value={this.state.title}
              onChange={this.onChangeTitle}
            />
            <span style={{color: "red"}}>{this.state.errorTitle}</span>
          </div>
          <div className="form-group">
            <label>Description:</label>
            <input type="text"
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
            />
            <span style={{color: "red"}}>{this.state.errorkDescription}</span>
          </div>
          <div className="form-group">
            <label>Period of execution:</label>
            <input type="date"
              className="form-control"
              value={this.formatDate(this.state.date)}
              onChange={this.onChangeDate}
            />
            <span style={{color: "red"}}>{this.state.errorDate}</span>
          </div>
          <div className="form-group">
            <input type="submit"
              value="Save"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    )
  }
}