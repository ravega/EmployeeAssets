import React, { Component } from 'react';
import './employee_assets.css';
import MaterialIcon from 'material-icons-react';

const List = ({items}) => (
  items.map( (item) => (
  <tr key={item.id.toString()}>
    <td>{item.name}</td>
    <td>{item.employeeId}</td>
    <td>{item.notes}</td>
    <td>{item.blocked ? "Blocked" : "Unblocked"}</td>
    <td>{item.serialNumber}</td>
  </tr>
  ))
);

class Assets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assets: []
    };
  }

  getAssets = () => {
    fetch('http://assets.ulises.life/assets',
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
      .then((assetsList) => {
        console.log('Response: ', assetsList);
        this.setState({assets: assetsList});
      })
      .catch(function() {
        console.log("Unauthorized");
    })
  }

  addAssets = (assetName, assetNotes, assetBlocked, assetSerialNumber) => {
    console.log('Blocked: ', assetBlocked);
    fetch('http://assets.ulises.life/assets',
          {
            method: 'post',
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json',
              'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify({name: assetName,
                                    notes: assetNotes,
                                    blocked: assetBlocked,
                                    serialNumber: assetSerialNumber})
          })
      .then((response) => {
        console.log('Response status: ', response.status);
      })
      .catch(function() {
        console.log("Error creating asset");
    })
  }

  componentDidMount() {
    this.getAssets();
  }

  render() {
    return (
      <div style={{width: 1000, margin: '0 auto'}}>
        <div>
          <input type="text" 
                  ref={ node => {this.assetName = node} }
                  placeholder="Asset name"
                  style={{color: 'black'}}/>
          <input type="text" 
                  ref={ node => {this.assetNotes = node} } 
                  placeholder="Asset notes"
                  style={{color: 'black'}}/>
          <input type="checkbox"
                  ref={ node => {this.assetBlocked = node} } />
          <input type="text" 
                  ref={ node => {this.assetSerialNumber = node} } 
                  placeholder="Serial number"
                  style={{color: 'black'}}/>
          <span className="action">
            <MaterialIcon icon="add_box" color='#000000' onClick={() => this.addAssets(this.assetName.value, this.assetNotes.value, this.assetBlocked.value, this.assetSerialNumber.value)}/>
          </span>
        </div>
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
          </tr>
	        <List items={this.state.assets} />
	        </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Assets;