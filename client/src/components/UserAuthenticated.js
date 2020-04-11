import React,{Component} from 'react';
import { Redirect } from 'react-router-dom';
class UserAuthenticated extends Component{
    constructor(props){
        super(props);
        this.state={
           shouldRedirect: false
        }
    }

    async componentWillMount(){
        const user = localStorage.getItem("user");
        if(user){
            const parsedUser = JSON.parse(user);
            const token = parsedUser.token;
            const res = await fetch(`/users/verify/${token}`);
            const json = await res.json();
            if(!json.success){
                this.setState({ shouldRedirect: true});
            }
          
        }else{
            this.setState({ shouldRedirect: true});
        }
    }

    componentDidMount() {
        this.props.handleChange()
    }

    render(){
        return(
            <div>
                <h1 style={{color: "#008080"}}>You are now authenticated!</h1>
                {this.state.shouldRedirect ?  <Redirect to="/signin"/>:null}
            </div>
            
        )
    }
}

export default UserAuthenticated;