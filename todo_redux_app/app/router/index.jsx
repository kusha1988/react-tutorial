var React = require('react');
var ReactDOM = require('react-dom');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');
import TodoApp from 'TodoApp';
import Login from 'Login';
import firebase from 'app/firebase/';

var requireLogin = (nextState, replace, next) => {
    if (!firebase.auth().currentUser) {
        replace('/');
    }
    next();
};

var redirectIfLogedIn = (nextState, replace, next) => {
    if (firebase.auth().currentUser) {
        replace('/todos');
    }
    next();
};


export default (
    <Router history={hashHistory}>
        <Route path="/">
            <Route path="todos" component={TodoApp} onEnter={requireLogin}/>
            <IndexRoute component={Login} onEnter={redirectIfLogedIn}/>
        </Route>
    </Router>
);