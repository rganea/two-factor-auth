import React,{Component} from 'react';

class SignInForm extends Component{
    API_URL = '/users/login';
    constructor(){
        super();
        this.state={
            currentUser: null,
            userData: {
                email: "",
                password: ""
            }
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

    async handleSubmit(e){
      e.preventDefault();
      const { email, password } = this.state.userData;
      if(email && password){
        const data = {email, password};
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
          }else{
            alert('not signed in');
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
                <button className="FormField__SignInbtn" >Sign in</button>
              </div>
            </form>
          </div>
        )
    }
}

export default SignInForm;