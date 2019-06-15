import React, { Component } from 'react';
import { HashRouter as Router, Route, NavLink} from 'react-router-dom'
import SignUpForm from './components/SignUpForm'
import SignInForm from './components/SignInForm'
import QRcode from './components/QRcode';
import './App.css';


class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
        <div className="App__Empty"></div>
        <div className="App__Form">
          <div className="PageSwitcher">
            <NavLink to="/signin" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign in</NavLink>
            <NavLink exact to="/"  activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign Up</NavLink>
          </div>

          <div className="FormTitle">
            <NavLink to="/signin" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Sign In</NavLink>
            <NavLink exact to="/" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Sign up</NavLink>
          </div>

          <Route exact path="/" component={SignUpForm}>
          </Route>
          <Route exact path="/qrcode" component={QRcode}/>
          <Route exact path="/signin" component={SignInForm}>
          </Route>
        </div>
      </div>
      </Router>
    );
  }
}

export default App;
