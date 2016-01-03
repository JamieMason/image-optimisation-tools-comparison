'use strict';

// 3rd party modules
var classNames = require('classNames');
var React = require('react');
var ReactRouter = require('react-router');

// modules
var translations = require('../translations');

// components
var Link = ReactRouter.Link;

// public
var Toggle = React.createClass({
    propTypes: {
        filters: React.PropTypes.object.isRequired,
        name: React.PropTypes.string.isRequired,
        onChange: React.PropTypes.func.isRequired
    },
    getQuery: function() {
        var query = Object.assign({}, this.props.filters);
        query[this.props.name] = !(query[this.props.name] === 'true');
        return query;
    },
    render: function() {
        var isChecked = this.props.filters[this.props.name] === 'true';
        var classes = classNames(
            'toggle',
            'toggle--' + this.props.name, {
                'toggle--checked': isChecked,
                'toggle--unchecked': !isChecked
            }
        );
        return (
            <Link className={classes} to="/" query={this.getQuery()}>
                <span className="toggle__icon">
                    {isChecked ? '\u2714' : '\u2716'}
                </span>
                <span className="toggle__label">
                    {translations[this.props.name]}
                </span>
            </Link>
            );
    }
});

module.exports = Toggle;
