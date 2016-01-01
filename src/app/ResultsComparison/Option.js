'use strict';

// 3rd party modules
var React = require('react');
var classNames = require('classNames');

// public
var Option = React.createClass({
    propTypes: {
        filters: React.PropTypes.object.isRequired,
        name: React.PropTypes.string.isRequired,
        onChange: React.PropTypes.func.isRequired
    },
    handleClick: function() {
        this.props.onChange(this.props.name, this.props.value);
    },
    render: function() {
        var classes = classNames(
            'toggle',
            'toggle--' + this.props.name
        );
        return (
            <label className="toggle">
                <input type="radio" className="toggle__input" name={this.props.name} value={this.props.value} onChange={this.handleClick} checked={this.props.filters[this.props.name] === this.props.value} />
                <span className="toggle__label">{this.props.children}</span>
            </label>
            );
    }
});

module.exports = Option;
