import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class SignUpForm extends Component{
  API_URL = '/users/register';
  ERROR_TIMEOUT = 5000;
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
          repassword:""
        },
        errors:[],
        messages:[]
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

    validateUser(){
      const {firstname,lastname,email,password,repassword} = this.state.userData;
      let errors = [];
      let valid = true;
      if(email===""){
        errors.push('Email must be filled out');
        valid = false;
      }
      if(email.indexOf("@")===-1){
        errors.push('Email must be valid');
        valid = false;
      }
      if(password === ""){
        errors.push('The password should be filled in');
        valid = false;
      }

      if(password.length < 8){
        errors.push('The password should be at least 8 characters long');
        valid = false;
      }
      
      if(repassword !== password){
        errors.push('The passwords should match');
        valid = false;
      }
      if(firstname===""){
        errors.push('You must fill out your last name');
        valid = false;
      }
      if(lastname===""){
        errors.push('You must fill out your firstname');
        valid = false;
      }
      this.setErrors(errors);
      setTimeout(() => this.resetErrors(), this.ERROR_TIMEOUT);
      return valid;
    }

    setErrors = errors => {
      this.setState({ errors });
    }
  
    resetErrors = () => {
      this.setState({ errors: []});
    }

    showErrors = () => {
      return this.state.errors.map((error, itemKey) => {
        return (
          <div style={{color:"red"}} className="alert alert-danger" key={itemKey}>
            {error}
          </div>
        );
      })
    }

    setMessages = messages => {
      this.setState({ messages });
      setTimeout(() => this.resetMessages(), this.ERROR_TIMEOUT);
    }
  
    resetMessages = () => {
      this.setState({ messages: []});
    }
  
    showMessages = () => {
      return this.state.messages.map((message, itemKey) => {
        return (
          <div className="alert alert-success" role="alert" key={itemKey}>
            {message}
          </div>
        );
      })
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
      if(this.validateUser()){
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
            this.setMessages(["User successfully added!"]);
            this.setState({
              shouldRedirect: true
            });
          }else{
            this.setErrors(json.err.errors.map(o => o.message));
          }
        } catch (e){
          alert(e.toString());
        }
      }
    }

    
    render(){
        return(
            <div className="FormCenter">
                {this.showErrors()}
                {this.showMessages()}
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
                <button className="FormField__SignUpbtn" onClick={ e => this.handleSubmit(e)}>Sign up</button>
              </div>
            </form>
            {this.state.shouldRedirect ? <Redirect to="/qrcode"/>:null}
          </div>
        )
  }
}

export default SignUpForm;
