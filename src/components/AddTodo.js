import  React,{Component} from "react";
import  PropTypes from "prop-types";

export default class AddTodo extends Component {
    //注册handKeyUp事件，调用传递过来的添加方法
    handleKeyUp(e){
        let content = e.target.value.trim();
        if (!content) return;
        //回车键的keyCode是13
        if (e.keyCode === 13) {
            this.props.addTodo({content, complete: false});
            e.target.value = ""
        }
    }
    render(){
        return (
            <div>
                <header className="header">
                    <h1>Todos</h1>
                    <input type="text" className="new-todo" placeholder="What need to be done ?"
                    onKeyUp={this.handleKeyUp.bind(this)} />
                </header>
            </div>
        )
    }
}
AddTodo.propTypes = {
    addTodo : PropTypes.func.isRequired
};