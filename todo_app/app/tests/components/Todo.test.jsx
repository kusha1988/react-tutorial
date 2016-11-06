var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jQuery');
var expect = require('expect');
var TestUtils = require('react-addons-test-utils');

var Todo = require('Todo');

describe('Todo', () => {
    it("should exists", ()=> {
        expect(Todo).toExist();
    });

    it("should call onToggle prop with id on click", ()=> {
        var todoData = {
            id : 1,
            text : "Test",
            completed : false
        };

        var spy = expect.createSpy();
        var todo = TestUtils.renderIntoDocument(<Todo {...todoData} onToggle={spy}/>);
        todo.setState({todos : [todoData]});
        var $el = $(ReactDOM.findDOMNode(todo));
        TestUtils.Simulate.click($el[0]);

        expect(spy).toHaveBeenCalledWith(1);
    });
});
