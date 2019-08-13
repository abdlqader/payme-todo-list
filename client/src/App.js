import React, { Component } from 'react';
import classes from './App.css';
import NewTodoList from './component/NewTodoList/NewTodoList';
import ViewTodoList from './component/ViewTodoList/ViewTodoList';
import Login from './component/Login/Login';
import { NavLink,Route,Redirect,Switch } from 'react-router-dom';
class App extends Component {
  state = {
    auth:false,
    user:null
  }
  changeAuth = (user) =>{
    this.setState({auth:true,user:user});
    console.log(user);
  }
  render() {
    return (
      <div className={classes.App}>
        <header>
            <nav>
                <ul>
                    <li><NavLink to="/todo-list" exact >Home</NavLink></li>
                    <li><NavLink to="/new-todo" >New Todo</NavLink></li>
                </ul>
            </nav>
        </header>
        <Switch>
            {this.state.auth ? <Route path="/new-todo" exact render={(props) => <NewTodoList {...props} user={this.state.user} />}/>:null}
            {this.state.auth ? <Route path="/todo-list" exact render={(props) => <ViewTodoList {...props} user={this.state.user} />}/>:null}
            <Route path="/login" exact render={(props) => <Login {...props} changeAuth={(user)=>this.changeAuth(user)} />}/>
            {this.state.auth ? <Redirect from="/" to="todo-list"/>:<Redirect from="/" to="login"/>}
            {/*<Route path="/" component={todo-list} />*/}
        </Switch>
        {/* <ViewTodoList/>
        <NewTodoList/> */}
      </div>
    );
  }
}

export default App;
