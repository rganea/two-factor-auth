import React,{Component} from 'react';
import { Redirect } from 'react-router-dom';

class SignInForm extends Component{
    API_URL = '/users/login';
    ERROR_TIMEOUT = 7000;
    constructor(){
        super();
        this.state={
            currentUser: null,
            userData: {
                email: "",
                password: "",
                totp:""
            },
            errors: [],
            messages: []
        }
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
      const {email, password,totp} = this.state.userData;
      let errors = [];
      let valid = true;
      if(email === ""){
        errors.push('Please fill in the email!');
        valid = false;
      }
      if(password === ""){
        errors.push('Please fill in the password!');
        valid = false;
      }
      if(totp === ""){
        errors.push('Please fill in the time based one time password!');
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

    async handleSubmit(e){
      e.preventDefault();
      const { email, password, totp} = this.state.userData;
      if(this.validateUser()){
        const data = {email, password, totp};
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
          console.log(json)
          if(json){
            localStorage.setItem("user", JSON.stringify(json));
            console.log(json.totp)
            console.log(this.state.userData.totp)
            if(json.totp === this.state.userData.totp){
              this.setState({
                shouldRedirect: true
              });
            }else{
              //console.log("The totps do not match")
              this.setErrors(["The totps do not match"]);
              console.log(this.state.userData.totp)
            }
           
          }else{
            this.setErrors(["Unauthorized: wrong username or password"]);
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
            <form className="FormFields" onSubmit={e => this.handleSubmit(e)}>
              <div className="FormField">
                <label className="FormField__Label">E-mail:</label>
                <input 
                type="text" 
                id="email" 
                value={this.state.userData.email} 
                className="FormField__Input" 
                placeholder="Enter e-mail"
                onChange={e => this.handleChange(e)}></input>
              </div>
              
              <div className="FormField">
                <label className="FormField__Label">Password:</label>
                <input 
                type="password" 
                id="password" 
                value={this.state.userData.password} 
                className="FormField__Input" 
                placeholder="Enter password"
                onChange={e => this.handleChange(e)}></input>
              </div>
              <div className="FormField">
                <label className="FormField__Label">Enter token from CyberGuard:</label>
                <input 
                type="password" 
                id="totp" 
                value={this.state.userData.totp} 
                className="FormField__Input" 
                placeholder="Enter token"
                onChange={e => this.handleChange(e)}></input>
              </div>

              <div className="FormField">
                <button className="FormField__SignInbtn" onClick={e => this.handleSubmit(e)}>Sign in</button>
              </div>
            </form>
            {this.state.shouldRedirect ?  <Redirect to="/userauthenticated"/>:null}
          </div>
        )
    }
}

export default SignInForm;