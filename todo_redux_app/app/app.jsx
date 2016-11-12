var React = require('react');
var ReactDOM = require('react-dom');
var { hashHistory } = require('react-router');
var {Provider} = require('react-redux');

import TodoApp from 'TodoApp';
import Login from 'Login';
import firebase from 'app/firebase/';
import router from 'app/router/';
var actions = require('actions');
var store = require('configureStore').configure();

// Load foundation
$(document).foundation();

firebase.auth().onAuthStateChanged((user)=> {
    if (user) {
        store.dispatch(actions.login(user.uid));
        store.dispatch(actions.startAddTodos(user.uid));
        hashHistory.push('/todos');
    } else {
        store.dispatch(actions.logout());
        hashHistory.push('/');
    }
});


// App css
require('style!css!sass!applicationStyles');

ReactDOM.render(
    <Provider store={store}>
        {router}
    </Provider>,
    document.getElementById('app')
);
