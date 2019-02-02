import React, { Component } from 'react';
import Navigation from './Navigation';
import Menu from './Menu';
import Employees from './Employees';
import EmployeeHistory from './EmployeeHistory';
import EmployeeAssets from './EmployeeAssets';
import Assets from './Assets';
import {Route} from 'react-router-dom';
//import AuthRoute from './AuthRoute';

const Info = (props) => (
    <h1>Please log in.</h1>
);

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    };
  }

  setLogin = (logged, token) => {
    this.setState({isLoggedIn: logged})
    if(logged) localStorage.setItem('token', token)
    else localStorage.removeItem('token')
  }

  render() {
    let intro = <Info/>
    if (this.state.isLoggedIn)
      intro = <Menu/>
    return (
      <div>
        <Navigation userLoggedIn={this.state.isLoggedIn} login={this.setLogin}/>
        <div className="container">
          {intro}
        </div>

        <Route path='/employees' component={Employees} />
        <Route exact path='/assets' component={Assets} />
        <Route path='/assets/:id' component={EmployeeAssets} />
        <Route path='/employee/:name' component={EmployeeHistory} />
      </div>
    );
  }
}

export default App;
