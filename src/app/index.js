'use strict';

// 3rd party modules
var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');

// components
var Route = ReactRouter.Route;
var Router = ReactRouter.Router;
var ResultsComparison = require('./ResultsComparison');

// data
var defaultQuery = {
    'codekit': true,
    'displayValue': 'score',
    'gif': true,
    'grunt-contrib-imagemin': true,
    'image_optim': true,
    'imagealpha-and-imageoptim': true,
    'imageoptim': true,
    'jpegmini-and-imageoptim': true,
    'jpg': true,
    'kraken': true,
    'name': true,
    'orderBy': 'name',
    'orderDesc': true,
    'photoshop': true,
    'png': true,
    'roundNumbers': true,
    'smushit': true,
    'tinypng': true
};

ReactDOM.render((
    <Router>
        <Route path="/" component={ResultsComparison} onEnter={onEnter} />
    </Router>
    ), document.getElementById('application'));

function onEnter(nextState, replaceState) {
    if (Object.keys(nextState.location.query).length === 0) {
        replaceState(null, '/', defaultQuery);
    }
}
