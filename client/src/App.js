import React, { Component } from 'react';
import { HashRouter as Router, Route, NavLink} from 'react-router-dom'
import SignUpForm from './components/SignUpForm'
import SignInForm from './components/SignInForm'
import QRcode from './components/QRcode';
import TokenRequest from './components/TokenRequest';
import './App.css';
import UserAuthenticated from './components/UserAuthenticated';


class App extends Component {
  constructor(props){
    super(props);
    this.state={
       canClick: true
    }
    this.handleChange = this.handleChange.bind(this)
}

async componentWillMount(){
  const user = localStorage.getItem("user");
  if(user){
      const parsedUser = JSON.parse(user);
      const token = parsedUser.token;
      const res = await fetch(`/users/verify/${token}`);
      const json = await res.json();
      if(!json.success){
          console.log("Success");
      }
  }else{
      console.log("Error");
  }
}

  handleChange() {
    this.state.canClick = false
  }


  render() {
    return (
      <Router>
      <div className="App">
        <div className="App__Empty"></div>
        <img className="Background" src={require('./background.jpg')} 
        style={{position:'absolute'}}></img>
        <div className="App__Form">
          {this.state.canClick ? 
            <div>
            <div id="pageSwitcher" className="PageSwitcher">
            <NavLink to="/signin" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign in</NavLink>
            <NavLink exact to="/"  activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign Up</NavLink>
          </div>

          <div id="formTitle" className="FormTitle">
            <NavLink to="/signin" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Sign In</NavLink>
            <NavLink exact to="/" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Sign up</NavLink>
          </div>
          </div>
          : ''}
          

          <Route exact path="/" component={SignUpForm}>
          </Route>
          <div className="QRcode">
          <Route exact path="/qrcode" component={QRcode}/>
          <Route exact path="/tokenrequest" component={TokenRequest}/>
          </div>
          <Route exact path="/signin" component={SignInForm}></Route>
          <Route exact path="/userauthenticated" component={() => <UserAuthenticated handleChange={this.handleChange} />}>
          </Route>
        </div>
      </div>
      </Router>
    );
  }
}

export default App;
