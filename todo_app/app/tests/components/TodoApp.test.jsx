var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jQuery');
var expect = require('expect');
var TestUtils = require('react-addons-test-utils');

var TodoApp = require('TodoApp');

describe('TodoApp', () => {
    it("should exists", ()=> {
        expect(TodoApp).toExist();
    });

    it("should add todo to the todos state on handleAddTodo", ()=> {
        var todoText = "test text";
        var todoApp = TestUtils.renderIntoDocument(<TodoApp />);
        todoApp.setState({todos : []});
        todoApp.handleAddTodo(todoText);

        expect(todoApp.state.todos[0].text).toBe(todoText);
        expect(todoApp.state.todos[0].createdAt).toBeA('number');
    });

    it("should toggle completed value when handleToggle called", ()=> {
        var todoData = {
            id : 1,
            text : "Test",
            completed : false,
            createdAt : 0,
            completedAt : undefined
        };

        var todoApp = TestUtils.renderIntoDocument(<TodoApp />);
        todoApp.setState({todos : [todoData]});

        expect(todoApp.state.todos[0].completed).toBe(false);
        todoApp.handleToggle(1);
        expect(todoApp.state.todos[0].completed).toBe(true);
        expect(todoApp.state.todos[0].completedAt).toBeA('number');
    });

    it("should toggle todo from completed to incompleted", ()=> {
        var todoData = {
            id : 1,
            text : "Test",
            completed : true,
            createdAt : 0,
            completedAt : 123
        };

        var todoApp = TestUtils.renderIntoDocument(<TodoApp />);
        todoApp.setState({todos : [todoData]});

        expect(todoApp.state.todos[0].completed).toBe(true);
        todoApp.handleToggle(1);
        expect(todoApp.state.todos[0].completed).toBe(false);
        expect(todoApp.state.todos[0].completedAt).toNotExist();
    });
});

