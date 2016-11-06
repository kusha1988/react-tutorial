var React = require('react');
var uuid = require('node-uuid');
var moment = require('moment');

var TodoList = require('TodoList');
var AddTodo = require('AddTodo');
var TodoSearch = require('TodoSearch');
var TodoAPI = require('TodoAPI');

var TodoApp = React.createClass({

    getInitialState : function() {
        return {
            showCompleted : false,
            searchText : '',
            todos : TodoAPI.getTodos()
        }
    },

    componentDidUpdate : function() {
        TodoAPI.setTodos(this.state.todos);
    },

    handleSearch : function(showCompleted, searchText) {
        this.setState({
            showCompleted : showCompleted,
            searchText : searchText.toLowerCase()
        });
    },

    handleToggle : function(id) {
        var updatedTodos = this.state.todos.map((todoItem) => {
            if (todoItem.id === id) {
                todoItem.completed = !todoItem.completed;
                todoItem.completedAt = todoItem.completed ? moment().unix() : undefined;
            }
            return todoItem;
        });

        this.setState({
            todos : updatedTodos
        })
    },

    handleAddTodo : function(text) {
        this.setState({
            todos : [
                ...this.state.todos,
                {
                    id : uuid(),
                    text : text,
                    completed : false,
                    createdAt : moment().unix(),
                    completedAt : undefined
                }
            ]
        })
    },

    render : function() {
        var {todos, showCompleted, searchText} = this.state;
        var filterTodos = TodoAPI.filterTodos(todos, showCompleted, searchText);

        return (
            <div>
                <h1 className="page-title">Todo App</h1>
                <div className="row">
                    <div className="column small-centered small-11 medium-6 large-5">
                        <div className="container">
                            <TodoSearch onSearch={this.handleSearch}/>
                            <TodoList todos={filterTodos} onToggle={this.handleToggle}/>
                            <AddTodo onAddTodo={this.handleAddTodo}/>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
});

module.exports = TodoApp;