'use strict';

// 3rd party modules
var classNames = require('classNames');
var React = require('react');
var ReactRouter = require('react-router');

// components
var Link = ReactRouter.Link;

// public
var Option = React.createClass({
    propTypes: {
        filters: React.PropTypes.object.isRequired,
        name: React.PropTypes.string.isRequired
    },
    getQuery: function() {
        var query = Object.assign({}, this.props.filters);
        query[this.props.name] = this.props.value;
        return query;
    },
    render: function() {
        var isChecked = this.props.filters[this.props.name] === this.props.value;
        var classes = classNames(
            'option',
            'option--' + this.props.name, {
                'option--checked': isChecked,
                'option--unchecked': !isChecked
            }
        );
        return (
            <Link className={classes} to="/" query={this.getQuery()}>
                <span className="option__label">
                    {this.props.children}
                </span>
            </Link>
            );
    }
});

module.exports = Option;
