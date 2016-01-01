'use strict';

// 3rd party modules
var React = require('react');
var classNames = require('classNames');

// modules
var translations = require('../translations');

// public
var TableHeader = React.createClass({
    propTypes: {
        filters: React.PropTypes.object.isRequired,
        onOrderChange: React.PropTypes.func.isRequired,
        tool: React.PropTypes.string.isRequired
    },
    handleClick: function() {
        this.props.onOrderChange(this.props.tool);
    },
    render: function() {
        var isSorted = this.props.filters.orderBy === this.props.tool;
        var isHidden = this.props.filters[this.props.tool] === false;
        var classes = isHidden ?
            'hidden' : classNames(
                'header',
                'header--' + this.props.tool,
                isSorted ? {
                    'header--sorted-asc': !this.props.filters.orderDesc,
                    'header--sorted-desc': this.props.filters.orderDesc,
                    'header--sorted': isSorted
                } : null
            );
        return (
            <th scope="col" className={classes}>
                <button className="header__btn" onClick={this.handleClick}>
                    {translations[this.props.tool]}
                </button>
            </th>
            );
    }
});

module.exports = TableHeader;
