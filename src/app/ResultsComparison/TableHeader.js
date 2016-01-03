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
var TableHeader = React.createClass({
    propTypes: {
        filters: React.PropTypes.object.isRequired,
        tool: React.PropTypes.string.isRequired
    },
    getQuery: function() {
        if (this.props.filters.orderBy === this.props.tool) {
            return Object.assign({}, this.props.filters, {
                orderDesc: !(this.props.filters.orderDesc === 'true')
            });
        } else {
            return Object.assign({}, this.props.filters, {
                orderBy: this.props.tool
            });
        }
    },
    render: function() {
        var filters = this.props.filters;
        var toolName = this.props.tool;
        var isSorted = filters.orderBy === toolName;
        var isHidden = filters[toolName] !== 'true';
        var classes = isHidden ?
            'hidden' : classNames(
                'header',
                'header--' + toolName,
                isSorted ? {
                    'header--sorted-asc': filters.orderDesc !== 'true',
                    'header--sorted-desc': filters.orderDesc === 'true',
                    'header--sorted': isSorted
                } : null
            );
        return (
            <th scope="col" className={classes}>
                <Link className="header__btn" to="/" query={this.getQuery()}>
                    {translations[toolName]}
                </Link>
            </th>
            );
    }
});

module.exports = TableHeader;
