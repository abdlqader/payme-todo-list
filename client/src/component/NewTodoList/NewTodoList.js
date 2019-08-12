import React,{Component} from 'react';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import classes from './NewTodoList.css';
import Spinner from '../UI/Spinner/Spinner';
class NewTodoList extends Component
{
    state = {
        todo:{
            name:this.formHelper('input','text','Todo Name',''),
            desc:this.formHelper('input','text','What to do ?','')
        },
        loading:false,
        responseToPost: null
    }
    
    createNewFormHandler=()=>{
        this.setState({creatingNew:true})
    }
    submitHandler = (event) =>{
        event.preventDefault();
        this.setState({loading:true});
        this.props.history.push('/todo-list');

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
                            <Input key={elem.id} {...elem.config}></Input>
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