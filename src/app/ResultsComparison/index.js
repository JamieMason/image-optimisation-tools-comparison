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
    getInitialState: function() {
        return {
            codekit: true,
            'grunt-contrib-imagemin': true,
            image_optim: true,
            'imagealpha-and-imageoptim': true,
            imageoptim: true,
            'jpegmini-and-imageoptim': true,
            kraken: true,
            photoshop: true,
            smushit: true,
            tinypng: true,
            gif: true,
            png: true,
            jpg: true,
            displayValue: 'score',
            roundNumbers: true,
            orderBy: 'name',
            orderDesc: true
        };
    },
    onOption: function(filterName, value) {
        var stateChange = {};
        stateChange[filterName] = value;
        this.setState(stateChange);
    },
    onOrderChange: function(columnName) {
        if (this.state.orderBy === columnName) {
            this.setState({
                orderDesc: !this.state.orderDesc
            });
        } else {
            this.setState({
                orderBy: columnName
            });
        }
    },
    onToggle: function(filterName) {
        var stateChange = {};
        stateChange[filterName] = !this.state[filterName];
        this.setState(stateChange);
    },
    getResults: function() {
        return results
            .filter(this.isEnabled)
            .sort(this.getSorter());
    },
    getSorter: function() {
        var outcome = this.state.orderDesc + '' + (this.state.orderBy === 'name');
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
                        <Filters onOption={this.onOption} onToggle={this.onToggle} filters={this.state} />
                    </div>
                </div>
                <Table filters={this.state} results={this.getResults()} onOrderChange={this.onOrderChange} />
            </div>
            );
    },
    isEnabled: function(image) {
        var extension = image.name.substr(image.name.length - 3);
        return this.state[extension];
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
        var orderBy = this.state.orderBy;
        var displayValue = this.state.displayValue;
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
