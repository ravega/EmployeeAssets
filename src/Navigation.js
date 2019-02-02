import React from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import MaterialIcon from 'material-icons-react';

class Navigation extends React.Component {
  
  authorize = (user, pass, login) => {
    fetch('http://assets.ulises.life/users/login',
          {
            method: 'post',
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: user, password: pass})
          })
      .then((response) => {
        console.log('Response: ', response.status);
        if(response.status === 200) {
          console.log('Result: ', response);
          response.json().then((auth) => {
            console.log('Result: ', auth);
            login(true, "Bearer " + auth.token);
          })
        } else {
          login(false, "");
        }
      })
      .catch(function() {
        console.log("Unauthorized");
    })
  }

  render() {

    const isLoggedIn = this.props.userLoggedIn;
    let logComponent;

    if (isLoggedIn) {
      logComponent = <div onClick={() => this.props.login(false, "")}>Logout</div>;
    } else {
      logComponent = <div>
      
        <input type="text" 
                ref={ node => {this.user = node} } 
                defaultValue="admin@admin.com"
                style={{color: 'black'}}/>

        <input type="password" 
                ref={ node => {this.pass = node} }
                defaultValue="admin"
                style={{color: 'black'}}/>

        <span onClick={() => this.authorize(this.user.value, 
                                            this.pass.value, 
                                            this.props.login)}>Login</span>
      
      </div>;
    }
    
    return (
	    <Navbar inverse collapseOnSelect>
	      <Navbar.Header>
	        <Navbar.Brand>
            <MaterialIcon icon="dashboard" color='#ffffff'/>
	          Employee Assets
	        </Navbar.Brand>
	        <Navbar.Toggle />
	      </Navbar.Header>
	      <Navbar.Collapse>
	        <Nav pullRight>
	          <NavItem eventKey={2} href="#">
              {logComponent}
	          </NavItem>
	        </Nav>
	      </Navbar.Collapse>
	    </Navbar>
    );
  }
}

export default Navigation;

