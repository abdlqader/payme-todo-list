import React, {Component} from 'react';
import classes from './ViewTodoList.css';
import Todo from './Todo/Todo';
import axios from 'axios';
import Spinner from '../UI/Spinner/Spinner';
class ViewTodoList extends Component {
    state = {
        data:null,
    }

    componentDidMount(){
        let message = {user:this.props.user}
        axios.post('/api/getall',message).then(res => {
            console.log(res.data);
            this.setState({data:res.data});
        }).catch(err => err);
    }
    onDeleteHandler =  (id) =>{
        if(window.confirm("Is this task done ?")){
        const message = {user:this.props.user,id:id}
        let newData = this.state.data;
        let counter = 0;
        axios.post('/api/delete',message).then(
            this.state.data.map(elem =>{
                if(elem.id === id){
                    newData.splice(counter,1);
                    this.setState({data:newData});
                }
            })
        ).catch(err => console.log(err));
        }
    }

    render(){
        let todos = <Spinner/>
        if(this.state.data){
            todos = this.state.data.map(todo =>(
                <Todo key={todo.id} title={todo.title} desc={todo.desc} click={() =>this.onDeleteHandler(todo.id)} />
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