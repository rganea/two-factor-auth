import React,{Component} from 'react';
import {Redirect} from "react-router-dom";
var totp = require('totp-generator');
class TokenRequest extends Component{
    constructor(){
        super();
        this.state={
            QRvalue:"",
           shouldRedirect: false
        }
    }

    componentWillMount(){
      const user = localStorage.getItem("user");
      if(user){
          const parsedUser = JSON.parse(user);
          this.setState({QRvalue: parsedUser.secret});
          var token = totp(this.state.QRvalue);
          console.log(token);
      }else{
          this.setState({ shouldRedirect: true});
      }
  }

    render(){
        return(
            <form className="FormFields">
              <div className="FormField">
                <h1>Please enter token generated in CyberGuard application</h1>
                <label className="FormField__Label">Token:</label>
                <input 
                type="password" 
                id="token" 
                className="FormField__Input" 
                placeholder="Enter token"></input>
              </div>

              <div className="FormField">
                <button className="FormField__SendTokenBtn" >Verify Token</button>
              </div>
            </form>
        )
    }
}

export default TokenRequest;