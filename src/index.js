import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import App from './App';

// import registerServiceWorker from './registerServiceWorker'; To be included

ReactDOM.render(
    <BrowserRouter>
      <App/> 
    </BrowserRouter>,
    document.getElementById('root')
);

// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();
