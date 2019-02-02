import React, { Component } from 'react';

function formatDate(dateString) {
  var date = new Date(dateString);
  return date.getDay() + "/" + date.getMonth() + "/" + date.getFullYear();
}

const List = ({items}) => (
  items.map( (item) => (
  <tr key={item.id.toString()}>
    <td>{item.id}</td>
    <td>{item.fromEmployee}</td>
    <td>{item.toEmployee}</td>
    <td>{item.asset}</td>
    <td>{formatDate(item.date)}</td>
  </tr>
  ))
);

class EmployeeHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      records: []
    };
  }

  getRecords = (name) => {
    fetch('http://assets.ulises.life/records',
          {
            method: 'GET',
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json',
              'Authorization': localStorage.getItem('token')
            }
          })
      .then((response) => {
        console.log('Response status: ', response.status);
        return response.json();
      })
      .then((records) => {
        console.log('Response: ', records);
        let filteredRecords = records.filter(function (el) {
                                return el.fromEmployee === name;
                              });
        this.setState({records: filteredRecords});
      })
      .catch(function() {
        console.log("Unauthorized");
    })
  }

  componentDidMount() {
    this.getRecords(this.props.match.params.name);
  }

  render() {
    return (
      <div style={{width: 1000, margin: '0 auto'}}>
        <div>
          <table>
	        <tbody>
          <tr>
            <th>id</th>
            <th>From employee</th>
            <th>To employee</th>
            <th>Asset</th>
            <th>Date</th>
          </tr>
	        <List items={this.state.records}/>
	        </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default EmployeeHistory;