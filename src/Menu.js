import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div style={{width: 1000, margin: '0 auto'}}>
          <ul>
            <li><Link to='/employees'> Employees </Link></li>
            <li><Link to='/assets'> Assets </Link></li>
          </ul>

          <hr/>
          {this.props.children}
      </div>
    );
  }
}

export default Menu;