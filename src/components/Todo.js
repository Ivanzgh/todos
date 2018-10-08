import  React,{Component} from "react";
import  PropTypes from "prop-types";

export default class Todo extends Component {
    constructor(props){
        super(props);
        this.state = {
            editing : false
        }
    }
    //给li动态设置editing类
    _setClassName(){
        if (this.props.todo.complete){
            if (this.state.editing){
                return "todo completed editing"
            }
            return "todo completed"
        }else {
            if (this.state.editing){
                return "todo editing"
            }
            return "todo"
        }
    }
    //给lable注册dlbClick事件
    handleDoubleClick(){
        this.setState ({
            editing : true
        },()=>{
            //让input框自动获取焦点
            this.refs.ipt.focus()
        })
    }
    //注册KeyUp事件
    handleKeyUp(e){
        if (e.keyCode === 13){
            let text = e.target.value.trim();
            this._updateTodo(text)
        }else if (e.keyCode === 27){
            //按下Esc键
            this.setState ({
                editing : false
            });
            e.target.value = this.props.todo.content
        }
    }
    _updateTodo(text){
        if (text){
            //更新操作
            this.props.updateTodo(this.props.todo,text)
        }else {
            //删除操作
            this.props.deleteTodo(this.props.todo)
        }
        this.setState ({
            editing : false
        })
    }
    //注册Blur事件
    handleBlur(e){
        let text = e.target.value.trim();
        this._updateTodo(text)
    }
    render(){
        return (
            <li className={this._setClassName()}>
                <div className="view">
                    <input type="checkbox" className="toggle" checked={this.props.todo.complete}
                    onChange={() => this.props.toggleTodo(this.props.todo)}
                    />
                    <label onDoubleClick={this.handleDoubleClick.bind(this)}>{this.props.todo.content}</label>
                    <button className="destroy"
                            onClick={()=>this.props.deleteTodo(this.props.todo)}>
                    </button>
                </div>
                {this.state.editing ? <input ref="ipt" type="text" className="edit"
                       defaultValue={this.props.todo.content}
                       // style={{display : this.state.editing ? "block" : "none"}}
                       onKeyUp={this.handleKeyUp.bind(this)}
                       onBlur={this.handleBlur.bind(this)}
                /> : null }
            </li>
        )
    }
}
Todo.propTypes = {
    todo : PropTypes.object.isRequired,
    deleteTodo : PropTypes.func.isRequired,
    toggleTodo : PropTypes.func.isRequired,
    updateTodo : PropTypes.func.isRequired
};