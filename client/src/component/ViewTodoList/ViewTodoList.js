import React, {Component} from 'react';
import classes from './ViewTodoList.css';
import Todo from './Todo/Todo';
import axios from 'axios';
import Spinner from '../UI/Spinner/Spinner';
class ViewTodoList extends Component {
    state = {
        data:null
    }

    componentDidMount(){
        axios.get('/api/getall').then(res => {
            console.log(res.data);
            this.setState({data:res.data});
        }).catch(err => err);
    }

    render(){
        let todos = <Spinner/>
        if(this.state.data){
            todos = this.state.data.map(todo =>(
                //key should be changed bec the logic is not correct
                <Todo key={todo.title} title={todo.title} desc={todo.desc} />
            ));
        }
        return(
            <div className={classes.TodoList}>
                {todos}
            </div>
        );
    }
}

export default ViewTodoList;