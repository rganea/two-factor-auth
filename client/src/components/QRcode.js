import React,{Component} from 'react';
import {Redirect} from "react-router-dom";
import QRCode from 'qrcode.react';
class QRcode extends Component{
    constructor(){
        super();
        this.state={
           QRvalue: "",
           shouldRedirect: false
        }
    }

    componentWillMount(){
        const user = localStorage.getItem("user");
        if(user){
            const parsedUser = JSON.parse(user);
            console.log(parsedUser)
            this.setState({QRvalue: parsedUser.secret});
        
        }else{
            this.setState({ shouldRedirect: true});
        }
    }

    render(){
        return(
            <div>
                <h1 style={{'text-align': 'center'}}>    
                    This is your personal QR code
                </h1>

            <QRCode value={this.state.QRvalue}/>
            {this.state.shouldRedirect ? <Redirect to="/"/>:null}

            <h2 style={{color: "red"}}>Attention! You can only access this QR code once! </h2>
            <h3>
            In order to login, you will need to use the token generator
                on the app. Please scan it with the app in order to save it on your phone!
            </h3>
            </div>

           
        )
    }
}

export default QRcode;