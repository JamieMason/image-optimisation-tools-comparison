'use strict';

// 3rd party modules
var React = require('react');

// components
var Filters = require('./Filters');
var Intro = require('./Intro');
var Table = require('./Table');

// data
var results = require('image-optimisation-tools-comparison/results.json');

// public
var ResultsComparison = React.createClass({
    onOption: function(filterName, value) {
        var stateChange = {};
        stateChange[filterName] = value;
        this.setState(stateChange);
    },
    onToggle: function(filterName) {
        var stateChange = {};
        stateChange[filterName] = !this.props.location.query[filterName];
        this.setState(stateChange);
    },
    getResults: function() {
        return results
            .filter(this.isEnabled)
            .sort(this.getSorter());
    },
    getSorter: function() {
        var outcome = this.props.location.query.orderDesc + '' + (this.props.location.query.orderBy === 'name');
        return ({
            truetrue: this.sortNameDesc,
            truefalse: this.sortDesc,
            falsetrue: this.sortNameAsc,
            falsefalse: this.sortAsc
        })[outcome];
    },
    render: function() {
        return (
            <div>
                <div className="pack">
                    <div className="pack__item pack__item--intro">
                        <Intro />
                    </div>
                    <div className="pack__item">
                        <Filters onOption={this.onOption} onToggle={this.onToggle} filters={this.props.location.query} />
                    </div>
                </div>
                <Table filters={this.props.location.query} results={this.getResults()} />
            </div>
            );
    },
    isEnabled: function(image) {
        var extension = image.name.substr(image.name.length - 3);
        return this.props.location.query[extension];
    },
    sort: function(a, b) {
        if (a < b) {
            return -1;
        }
        if (a > b) {
            return 1;
        }
        return 0;
    },
    sortAsc: function(a, b) {
        var orderBy = this.props.location.query.orderBy;
        var displayValue = this.props.location.query.displayValue;
        return this.sort(a[orderBy][displayValue], b[orderBy][displayValue]);
    },
    sortDesc: function(a, b) {
        return this.sortAsc(b, a);
    },
    sortNameAsc: function(a, b) {
        return this.sort(a.name, b.name);
    },
    sortNameDesc: function(a, b) {
        return this.sort(b.name, a.name);
    }
});

module.exports = ResultsComparison;
