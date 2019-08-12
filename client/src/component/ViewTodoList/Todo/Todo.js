import React from 'react';
import classes from './Todo.css';
const Todo = (props) => (
    <div className={classes.Todo}>
        <h1>{props.title}</h1>
        <div>
            <div>{props.desc}</div>
        </div>
    </div>
)
export default Todo;