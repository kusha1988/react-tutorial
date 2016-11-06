var expect = require('expect');

var TodoAPI = require('TodoAPI');

describe('TodoAPI', () => {

    beforeEach(() => {
        localStorage.removeItem('todos');
    });

    it("should exists", ()=> {
        expect(TodoAPI).toExist();
    });

    describe('setTodos', () => {

        it("should set valid todos array", ()=> {
            var todos = [{
                id : 1,
                text : 'text',
                completed : true
            }];

            TodoAPI.setTodos(todos);
            var actualTodos = JSON.parse(localStorage.getItem('todos'));
            expect(actualTodos).toEqual(todos);
        });

        it("should set not valid todos array", ()=> {
            var badTodos = {a : 'b'};
            TodoAPI.setTodos(badTodos);
            expect(localStorage.getItem('todos')).toEqual(null);
        });

    });

    describe('getTodos', () => {
        it("should empty array for bad localstorage data", ()=> {
            var actualTodos = TodoAPI.getTodos();
            expect(actualTodos).toEqual([]);
        });

        it("should return todos if valiad array in localstorage", ()=> {
            var todos = [{
                id : 1,
                text : 'text',
                completed : true
            }];

            localStorage.setItem('todos', JSON.stringify(todos));
            var actualTodos = TodoAPI.getTodos();
            expect(actualTodos).toEqual(todos);
        });

    });

    describe('filterTodos', () => {

        var todos = [{
            id : 1,
            text : 'text 1',
            completed : true
        }, {
            id : 2,
            text : 'my search 2',
            completed : false
        }, {
            id : 3,
            text : 'text 3',
            completed : true
        }];

        it("should return all items if showCompleted is true", ()=> {
            var filteredTodos = TodoAPI.filterTodos(todos, true, '');
            expect(filteredTodos.length).toEqual(3);
        });

        it("should return one item if showCompleted is false", ()=> {
            var filteredTodos = TodoAPI.filterTodos(todos, false, '');
            expect(filteredTodos.length).toEqual(1);
        });

        it("should sort by completed status", ()=> {
            var filteredTodos = TodoAPI.filterTodos(todos, true, '');
            expect(filteredTodos[0].completed).toBe(false);
        });

        it("should search todos by searchText", ()=> {
            var filteredTodos = TodoAPI.filterTodos(todos, true, 'search');
            expect(filteredTodos.length).toEqual(1);
        });

        it("should return all todos if srachText is empty", ()=> {
            var filteredTodos = TodoAPI.filterTodos(todos, true, '');
            expect(filteredTodos.length).toEqual(3);
        });

    });
});
