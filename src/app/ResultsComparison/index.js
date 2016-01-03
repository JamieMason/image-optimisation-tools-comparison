'use strict';

// 3rd party modules
var React = require('react');

// components
var Option = require('./Option');
var Table = require('./Table');
var Toggle = require('./Toggle');

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
    getResults: function() {
        return results
            .filter(this.isEnabled)
            .sort(this.state.orderDesc ? this.sortDesc : this.sortAsc);
    },
    sortAsc: function(a, b) {
        var orderBy = this.state.orderBy;
        var displayValue = this.state.displayValue;
        var foo = orderBy === 'name' ? a.name : a[orderBy][displayValue];
        var bar = orderBy === 'name' ? b.name : b[orderBy][displayValue];
        return foo < bar ? -1 : foo > bar ? 1 : 0;
    },
    sortDesc: function(a, b) {
        return this.sortAsc(b, a);
    },
    isEnabled: function(image) {
        var extension = image.name.substr(image.name.length - 3);
        return this.state[extension];
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
    onOption: function(filterName, value) {
        var stateChange = {};
        stateChange[filterName] = value;
        this.setState(stateChange);
    },
    render: function() {
        return (
            <div>
                <div className="pack">
                    <div className="pack__item intro">
                        <h1>Benchmarks of Image Optimisation Tools</h1>
                        <p>Speeding up images often comes with a cost in picture quality and finding the right balance can be difficult.</p>
                        <p>Here we compare the results of several image optimisation tools.</p>
                        <p className="shields">
                            <a href="https://twitter.com/fold_left" target="_blank" className="shields__item shields__item--twitter">
                                <img src="https://img.shields.io/twitter/follow/fold_left.svg?style=social" alt="Follow @fold_left on Twitter" />
                            </a>
                            <a href="https://github.com/JamieMason" target="_blank" className="shields__item shields__item--github">
                                <img src="https://img.shields.io/github/followers/JamieMason.svg?style=social&label=Follow" alt="Follow @fold_left on Twitter" />
                            </a>
                        </p>
                    </div>
                    <div className="pack__item">
                        <fieldset className="filters filters--tools">
                            <legend className="filters__label">Visible Tools</legend>
                            <Toggle onChange={this.onToggle} filters={this.state} name="codekit" />
                            <Toggle onChange={this.onToggle} filters={this.state} name="grunt-contrib-imagemin" />
                            <Toggle onChange={this.onToggle} filters={this.state} name="image_optim" />
                            <Toggle onChange={this.onToggle} filters={this.state} name="imagealpha-and-imageoptim" />
                            <Toggle onChange={this.onToggle} filters={this.state} name="imageoptim" />
                            <Toggle onChange={this.onToggle} filters={this.state} name="jpegmini-and-imageoptim" />
                            <Toggle onChange={this.onToggle} filters={this.state} name="kraken" />
                            <Toggle onChange={this.onToggle} filters={this.state} name="photoshop" />
                            <Toggle onChange={this.onToggle} filters={this.state} name="smushit" />
                            <Toggle onChange={this.onToggle} filters={this.state} name="tinypng" />
                        </fieldset>
                        <fieldset className="filters filters--extensions">
                            <legend className="filters__label">Visible File Types</legend>
                            <Toggle onChange={this.onToggle} filters={this.state} name="gif" />
                            <Toggle onChange={this.onToggle} filters={this.state} name="png" />
                            <Toggle onChange={this.onToggle} filters={this.state} name="jpg" />
                        </fieldset>
                        <fieldset className="filters filters--display">
                            <legend className="filters__label">Visible Metric</legend>
                            <Option onChange={this.onOption} filters={this.state} name="displayValue" value="sizeSavingPercent">Percentage Filesize Saved</Option>
                            <Option onChange={this.onOption} filters={this.state} name="displayValue" value="lossPercent">Percentage Quality Loss</Option>
                            <Option onChange={this.onOption} filters={this.state} name="displayValue" value="sizeSaving">Bytes Removed</Option>
                            <Option onChange={this.onOption} filters={this.state} name="displayValue" value="score">Overall Score</Option>
                            <Option onChange={this.onOption} filters={this.state} name="displayValue" value="ssim">SSIM</Option>
                        </fieldset>
                        <fieldset className="filters filters--options">
                            <legend className="filters__label">Options</legend>
                            <Toggle onChange={this.onToggle} filters={this.state} name="roundNumbers" />
                        </fieldset>
                    </div>
                </div>
                <Table filters={this.state} results={this.getResults()} onOrderChange={this.onOrderChange} />
            </div>
            );
    }
});

module.exports = ResultsComparison;
