import  React,{Component} from "react";
import  PropTypes from "prop-types";

export default class Footer extends Component {
    render(){
        return (
            <footer className="footer">
                <span className="todo-count"><strong>{this.props.leftTodos}</strong>items left</span>
                <ul className="filters">
                    <li>
                        <a href="javascript:;" className={this.props.visibility === "all" ? "selected" : ""}
                           onClick={()=>this.props.setVisibility("all")}>all</a>
                    </li>
                    <li>
                        <a href="javascript:;" className={this.props.visibility === "active" ? "selected" : ""}
                           onClick={()=>this.props.setVisibility("active")}>active</a>
                    </li>
                    <li>
                        <a href="javascript:;" className={this.props.visibility === "completed" ? "selected" : ""}
                           onClick={()=>this.props.setVisibility("completed")}>completed</a>
                    </li>
                </ul>
                {this.props.finishedTodos >0 ? <button className="clear-completed" onClick={()=>this.props.clearCompleted()}>clear completed</button> : null}
            </footer>

        )
    }
}
Footer.propTypes = {
    leftTodos : PropTypes.number.isRequired,
    setVisibility : PropTypes.func.isRequired,
    visibility : PropTypes.string.isRequired,
    finishedTodos : PropTypes.number.isRequired,
    clearCompleted : PropTypes.func.isRequired
};

