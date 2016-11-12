var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var expect = require('expect');
var $ = require('jquery');

import { Todo } from 'Todo';
import * as actions from "actions";

describe('Todo', () => {
    it('should exist', () => {
        expect(Todo).toExist();
    });

    it('should dispatch UPDATE_TODO action on click', () => {
        var todoData = {
            id : 1,
            text : 'Write todo.test.jsx test',
            completed : true
        };

        var action = actions.startToggleTodo(todoData.id, !todoData.completed);

        var spy = expect.createSpy();
        var todo = TestUtils.renderIntoDocument(<Todo {...todoData} dispatch={spy}/>);
        var $el = $(ReactDOM.findDOMNode(todo));

        TestUtils.Simulate.click($el[0]);

        expect(spy).toHaveBeenCalledWith(action);
    });
});
