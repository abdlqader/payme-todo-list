import React, {Component} from 'react';
import classes from './ViewTodoList.css';
import Todo from './Todo/Todo';
class ViewTodoList extends Component {

    render(){
        return(
            <div className={classes.TodoList}>
                <Todo title="do it" desc="just do me" />
            </div>
        );
    }
}

export default ViewTodoList;