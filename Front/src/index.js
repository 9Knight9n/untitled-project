import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
// import './index.css';
import App from './App';
import Test from './components/test'
import * as serviceWorker from './serviceWorker';
// import SignInForm from './pages/SignInForm';

// import SignInToSignUp from './pages/SignInToSignUp';


//allow react dev tools work
window.React = React;

ReactDOM.render(
  <React.StrictMode>
    
    <App /> 
    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
