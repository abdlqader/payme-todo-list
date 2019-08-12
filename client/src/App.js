import React, { Component } from 'react';
import classes from './App.css';
import NewTodoList from './component/NewTodoList/NewTodoList';
import ViewTodoList from './component/ViewTodoList/ViewTodoList';
import { NavLink,Route,Redirect,Switch } from 'react-router-dom';
class App extends Component {
  state = {
    auth:true
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
            {this.state.auth ? <Route path="/new-todo" component={NewTodoList} />:null}
            <Route path="/todo-list" component={ViewTodoList} />
            <Redirect from="/" to="todo-list"/>
            {/*<Route path="/" component={todo-list} />*/}
        </Switch>
        {/* <ViewTodoList/>
        <NewTodoList/> */}
      </div>
    );
  }
}

export default App;
