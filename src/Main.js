import React, {Component} from 'react';
import Navigation from './Navigation';

class Main extends Component {
    render(){
        return(
            <div>
                <Navigation/>
                <div className="container">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default Main