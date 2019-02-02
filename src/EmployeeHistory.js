import React, { Component } from 'react';
import './employee_assets.css';
import MaterialIcon from 'material-icons-react';

const List = ({items, assign}) => (
  items.map( (item) => (
  <tr key={item.id.toString()}>
    <td>{item.name}</td>
    <td>{item.employeeId}</td>
    <td>{item.notes}</td>
    <td>{item.blocked ? "Blocked" : "Unblocked"}</td>
    <td>{item.serialNumber}</td>
    <td className="action">
      <div onClick={() => assign(item.id)}><MaterialIcon icon="add" color='#000000'/></div>
    </td>
    
  </tr>
  ))
);

class EmployeeAssets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assets: []
    };
  }

  getAssets = () => {
    fetch('http://assets.ulises.life/assets',
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
      .then((assetsList) => {
        console.log('Response: ', assetsList);
        this.setState({assets: assetsList});
      })
      .catch(function() {
        console.log("Unauthorized");
    })
  }

  assignAsset = (empId, assetId) => {
    console.log('Assigning asset ' + assetId + ' to employee ', empId);
    fetch('http://assets.ulises.life/assets/' + assetId,
          {
            method: 'PATCH',
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json',
              'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify({employeeId: empId})
          })
      .then((response) => {
        console.log('Response status: ', response.status);
        this.getAssets();
      })
      .catch(function() {
        console.log("Error creating asset");
    })
  }

  assignCallBack(assetId) {
    console.log('assignCallBack: ', assetId);
    this.assignAsset(this.props.match.params.id, assetId);
  }

  componentDidMount() {
    this.getAssets();
  }

  render() {
    return (
      <div style={{width: 1000, margin: '0 auto'}}>
        
        <div>
          <h1>Asset list:</h1>
          <table>
	        <tbody>
          <tr>
            <th>Name</th>
            <th>Employee Id</th>
            <th>Notes</th>
            <th>Blocked</th>
            <th>Serial</th>
            <th></th>
          </tr>
	        <List items={this.state.assets} assign={(id) => this.assignCallBack(id)}/>
	        </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default EmployeeAssets;