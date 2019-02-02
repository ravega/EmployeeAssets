import React, { Component } from 'react';
import './employee_assets.css';
import MaterialIcon from 'material-icons-react';

const List = ({items}) => (
  items.map( (item) => (
  <tr key={item.id.toString()}>
    <td>{item.id}</td>
    <td>{item.name}</td>
  </tr>
  ))
);

class Employees extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: []
    };
  }

  getEmployees = () => {
    fetch('http://assets.ulises.life/employees',
          {
            method: 'get',
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
      .then((employeList) => {
        console.log('Response: ', employeList);
        this.setState({employees: employeList});
      })
      .catch(function() {
        console.log("Unauthorized");
    })
  }

  addEmployee = (userName) => {
    fetch('http://assets.ulises.life/employees',
          {
            method: 'post',
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json',
              'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify({name: userName})
          })
      .then((response) => {
        console.log('Response status: ', response.status);
      })
      .catch(function() {
        console.log("Error creating employee");
    })
  }

  componentDidMount() {
    this.getEmployees();
  }

  render() {
    return (
      <div style={{width: 1000, margin: '0 auto'}}>
        <div>
          <input type="text" 
                  ref={ node => {this.userName = node} } 
                  style={{color: 'black'}}/>
          <span className="action">
            <MaterialIcon icon="add_box" color='#000000' onClick={() => this.addEmployee(this.userName.value)}/>
          </span>
        </div>
        <div>
          <h1>Employe list:</h1>
          <table>
	        <tbody>
          <tr>
            <th>Id</th>
            <th>Name</th>
          </tr>
	        <List items={this.state.employees} />
	        </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Employees;