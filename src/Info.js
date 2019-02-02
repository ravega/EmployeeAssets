import React, { Component } from 'react';
import MaterialIcon from 'material-icons-react';

class Info extends Component {

  render() {
    return (
    <div>     
      <h1><MaterialIcon icon="import_contacts" color='#000000' size="24"/> {this.props.match.params.name}</h1>
      <hr></hr>
      
      <div className="Row">
        <textarea placeholder="Book review" cols="140" rows="15"></textarea>
      </div>
      <div className="Row">
        <button className="pull-right">Save</button>
      </div>
    </div>
    );
  }
}

export default Info;