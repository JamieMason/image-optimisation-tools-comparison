'use strict';

// 3rd party modules
var React = require('react');
var classNames = require('classNames');

// modules
var translations = require('../translations');

// public
var Toggle = React.createClass({
    propTypes: {
        filters: React.PropTypes.object.isRequired,
        name: React.PropTypes.string.isRequired,
        onChange: React.PropTypes.func.isRequired
    },
    handleClick: function() {
        this.props.onChange(this.props.name);
    },
    render: function() {
        var classes = classNames(
            'toggle',
            'toggle--' + this.props.name
        );
        return (
            <label className={classes}>
                <input className="toggle__input" type="checkbox" checked={this.props.filters[this.props.name]} onChange={this.handleClick} />
                <span className="toggle__label">
                    {translations[this.props.name]}
                </span>
            </label>
            );
    }
});

module.exports = Toggle;
