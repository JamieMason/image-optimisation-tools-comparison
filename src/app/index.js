'use strict';

// 3rd party modules
var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');

// components
var Route = ReactRouter.Route;
var Router = ReactRouter.Router;
var ResultsComparison = require('./ResultsComparison');

ReactDOM.render((
    <Router>
        <Route path="/" component={ResultsComparison} />
    </Router>
    ), document.getElementById('application'));
