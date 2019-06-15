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
            this.setState({QRvalue: parsedUser.secret});
        }else{
            this.setState({ shouldRedirect: true});
        }
    }

    render(){
        return(
            <div>
                <QRCode value={this.state.QRvalue}/>
                {this.state.shouldRedirect ? <Redirect to="/"/>:null}
            </div>
        )
    }
}

export default QRcode;