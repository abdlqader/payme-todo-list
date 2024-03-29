import React,{Component} from 'react';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import classes from './NewTodoList.css';
import Spinner from '../UI/Spinner/Spinner';
import axios from 'axios';
class NewTodoList extends Component
{
    state = {
        todo:{
            title:this.formHelper('input','text','Todo Title',''),
            desc:this.formHelper('input','text','What to do ?','')
        },
        loading:false
    }
    
    submitHandler = (event) =>{
        event.preventDefault();
        let message = {user : this.props.user}
        for(let key in this.state.todo){
            message[key] = this.state.todo[key].value;
        }
        this.setState({loading:true});
        axios.post('/api/addnew',message).then(res => {
            this.setState({loading:false});
            this.props.history.push('/todo-list');
        }).catch(err => console.log(err));

    }
    inputChangedHandler = (event , inputIdent) =>{
        const updatedTodo = {...this.state.todo};
        const updatedElement = {...updatedTodo[inputIdent]};
        updatedElement.value = event.target.value;
        updatedTodo[inputIdent] = updatedElement;
        this.setState({todo:updatedTodo});
    }
    formHelper (elemType,elemConfigType,elemConfigPlaceHolder,elemValue){
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
    render(){
        let formElementArray = [];
        
            for (let key in this.state.todo){
                formElementArray.push({
                    id:key,
                    config: this.state.todo[key]
                })
            }
            let form = 
            <form onSubmit={this.submitHandler}>
                <p><strong>New Todo</strong></p>
                {   formElementArray.map(elem => (
                            <Input 
                            key={elem.id} 
                            {...elem.config}
                            changed={(event) => this.inputChangedHandler(event,elem.id)}
                         ></Input>
                    ))
                }
                <Button btnType="Success">Submit</Button>
            </form>
            
        if (this.state.loading){
            form = <Spinner />
        }
        return(
            <div className={classes.TodoData}>
                {form}
            </div>
        );
    }
}
export default NewTodoList;