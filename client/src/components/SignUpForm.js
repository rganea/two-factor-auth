import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class SignUpForm extends Component{
  API_URL = '/users/register';
    constructor(){
      super();
      this.state={
        currentUser: null,
        shouldRedirect: false,
        userData: {
          firstname: "",
          lastname: "",
          email:"",
          password: "",
          repassword:"",
        }
      };
    }
    handleChange(e){
      const {value, id} = e.target;
      this.setState({
        userData: {
          ...this.state.userData, [id]: value
        }
      });
    }

    async handleSubmit(e){
      e.preventDefault();
      const { 
        firstname,
        lastname,
        email,
        password,
        repassword 
      } = this.state.userData;
      if(firstname && lastname && repassword && 
        email && password &&
        (password === repassword)){
        const data = { 
          firstname,
          lastname,
          email,
          password,
          repassword 
        };
        try{
          const res = await fetch(this.API_URL, {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            headers: {
              "Content-Type":"application/json"
            },
            body: JSON.stringify(data)
          });
          const json = await res.json();
          if(json){
            localStorage.setItem("user", JSON.stringify(json));
            this.setState({
              shouldRedirect: true
            });
          }else{
            alert('account not created');
          }
        } catch (e){
          alert(e.toString());
        }
      }
    }
    render(){
        return(
            <div className="FormCenter">
            <form className="FormFields" onSubmit={e => this.handleSubmit(e)}>
              <div className="FormField">
                <label className="FormField__Label">First Name:</label>
                <input type="text"
                 id="firstname"
                  value={this.state.userData.firstname}
                   className="FormField__Input" 
                   placeholder="Enter first name"
                   onChange={e => this.handleChange(e)}></input>
              </div>
              <div className="FormField">
                <label className="FormField__Label">Last Name:</label>
                <input type="text" id="lastname" value={this.state.userData.lastname} className="FormField__Input" placeholder="Enter last name"
                onChange={e => this.handleChange(e)}></input>
              </div>
              <div className="FormField">
                <label className="FormField__Label">E-mail:</label>
                <input type="text" id="email" value={this.state.userData.email} className="FormField__Input" placeholder="Enter e-mail"
                onChange={e => this.handleChange(e)}></input>
              </div>
              <div className="FormField">
                <label className="FormField__Label">Password:</label>
                <input type="password" id="password" value={this.state.userData.password} className="FormField__Input" placeholder="Enter password"
                onChange={e => this.handleChange(e)}></input>
              </div>

              <div className="FormField">
                <label className="FormField__Label">Re-enter password:</label>
                <input type="password" id="repassword" value={this.state.userData.repassword} className="FormField__Input" placeholder="Re-enter password"
                onChange={e => this.handleChange(e)}></input>
              </div>

              <div className="FormField">
                <button className="FormField__SignUpbtn">Sign up</button>
              </div>
            </form>
            {this.state.shouldRedirect ? <Redirect to="/qrcode"/>:null}
          </div>
        )
  }
}

export default SignUpForm;
