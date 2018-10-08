import React, { Component } from 'react';
import "../styles/todo-mvc.css";
import AddTodo from "./AddTodo";
import TodoList from "./TodoList";
import Footer from "./Footer";

export default class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            // 初始化状态
            todos : [
                {content:"HTML",complete:true},
                {content:"CSS",complete:true},
                {content:"JS",complete:false}
            ],
            visibility : "all"
        }
    }
    //定义一个方法，添加todo
    addTodo(todo){
        this.state.todos.push(todo);
        //更新状态
        this.setState ({
                todos : this.state.todos
            })
    }
    //删除todo
    deleteTodo(todo){
        //findIndex() 方法返回传入一个测试条件（函数）符合条件的数组第一个元素位置。
        //splice() 方法用于插入、删除或替换数组的元素。
        //array.splice(index,howmany,item1,.....,itemX)
        let index = this.state.todos.findIndex(t => t === todo);
        this.state.todos.splice(index,1);
        this.setState({
            todos : this.state.todos
        })
    }
    //切换指定todo状态
    toggleTodo(todo){
        let index = this.state.todos.findIndex(t => t === todo);
        this.state.todos[index].complete = ! this.state.todos[index].complete;
        this.setState({
            todos : this.state.todos
        })
    }
    //切换全部todo状态
    toggleAll(done){
        this.state.todos.forEach(todo => todo.complete = done);
        this.setState ({
            todos : this.state.todos
        })
    }
    //根据所有todo的状态，判断是否全选
    allChecked(){
        return this.state.todos.every(todo => todo.complete)
    }
    //定义一个方法，统计未完成的todo
    leftTodos(){
        return this.state.todos.filter(todo => !todo.complete).length;
    }
    //根据todos和visibility计算得到最终要显示的todos
    filteredTodos(){
            switch (this.state.visibility){
                case "all" :
                    return this.state.todos;
                case "active" :
                    return this.state.todos.filter(todo => !todo.complete);
                case "completed" :
                    return this.state.todos.filter(todo => todo.complete);
                default :
                    break;
            }
    }
    //设置visibility
    setVisibility(filter){
        this.setState ({
            visibility : filter
        })
    }
    //统计已经完成的todos
    finishedTodos(){
        return this.state.todos.filter(todo => todo.complete).length;
    }
    //清除已完成的todos
    clearCompleted(){
        let arr = this.state.todos.filter(todo => !todo.complete);
        this.setState ({
            todos :arr
        })
    }
    //更新指定的todo
    updateTodo(todo,text){
        let index = this.state.todos.findIndex(t=>t === todo);
        this.state.todos[index].content = text;
        this.setState ({
            todos : this.state.todos
        })
    }
    render() {
        return (
            <section className="todoapp">
                <AddTodo addTodo={this.addTodo.bind(this)}/>
                <TodoList
                    todos={this.filteredTodos()}
                    deleteTodo={this.deleteTodo.bind(this)}
                    toggleTodo={this.toggleTodo.bind(this)}
                    toggleAll={this.toggleAll.bind(this)}
                    allChecked={this.allChecked()}
                    updateTodo={this.updateTodo.bind(this)}
                />
                <Footer leftTodos={this.leftTodos()}
                        setVisibility={this.setVisibility.bind(this)}
                        visibility={this.state.visibility}
                        finishedTodos={this.finishedTodos()}
                        clearCompleted={this.clearCompleted.bind(this)}
                />
            </section>
        );
    }
}

