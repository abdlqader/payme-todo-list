import React, { Component } from 'react';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import classes from './Login.css';
import Spinner from '../UI/Spinner/Spinner';
import axios from 'axios';
class Login extends Component{
    state = {
        login:{
            username:this.formLoginHelper('input','text','Username',''),
            password:this.formLoginHelper('input','password','Password','')
        },
        loading:false
    }
    formLoginHelper (elemType,elemConfigType,elemConfigPlaceHolder,elemValue){
        let elem = {
            elementType: elemType,
            elementConfig: {
                type:elemConfigType,
                placeholder:elemConfigPlaceHolder
            },
            value:elemValue
        };
        return elem;
    }
    submitLoginHandler = (event) =>{
        event.preventDefault();
        let message = {}
        for(let key in this.state.login){
            message[key] = this.state.login[key].value;
        }
        console.log(message);
        this.setState({loading:true});
        axios.post('/api/checkuser',message).then(res => {
            this.setState({loading:false});
            if(res.data){
                this.props.changeAuth(message['username']);
                this.props.history.push('/todo-list');
            }
        }).catch(err => console.log(err));

    }
    inputLoginChangedHandler = (event , inputLoginIdent) =>{
        const updatedLogin = {...this.state.login};
        const updatedElement = {...updatedLogin[inputLoginIdent]};
        updatedElement.value = event.target.value;
        updatedLogin[inputLoginIdent] = updatedElement;
        this.setState({login:updatedLogin});

    }
    render(){
        let formLoginElementArray = [];
        
        for (let key in this.state.login){
            formLoginElementArray.push({
                id:key,
                config: this.state.login[key]
            })
        }
        let Login = 
        <form onSubmit={this.submitLoginHandler}>
            <p><strong>Login</strong></p>
            {   formLoginElementArray.map(elem => (
                        <Input 
                        key={elem.id} 
                        {...elem.config}
                        changed={(event) => this.inputLoginChangedHandler(event,elem.id)}
                     ></Input>
                ))
            }
            <Button btnType="Success">Submit</Button>
        </form>
        
    if (this.state.loading){
        Login = <Spinner />
    }
        return(
            <div className={classes.Login}>
                {Login}
            </div>
        )
    }
}
export default Login;