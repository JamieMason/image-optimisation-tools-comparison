'use strict';

// 3rd party modules
var React = require('react');
var classNames = require('classNames');

// public
var TableCell = React.createClass({
    propTypes: {
        data: React.PropTypes.object.isRequired,
        filters: React.PropTypes.object.isRequired,
        tool: React.PropTypes.string.isRequired
    },
    format: function(displayName, displayValue) {
        if (displayName === 'ssim') {
            return displayValue;
        }
        if (this.props.filters.roundNumbers) {
            displayValue = Math.round(displayValue);
        }
        if (displayName.endsWith('Percent')) {
            return `${displayValue}%`;
        }
        return displayValue;
    },
    render: function() {
        var result = this.props.data[this.props.tool];
        var displayName = this.props.filters.displayValue;
        var displayValue = result[displayName];
        var isHidden = this.props.filters[this.props.tool] === false;
        var isSorted = this.props.filters.orderBy === this.props.tool;
        var classes = isHidden ?
            'hidden' : classNames(
                'cell',
                'cell--' + this.props.tool,
                isSorted ? {
                    'cell--sorted': isSorted,
                    'cell--sorted-asc': !this.props.filters.orderDesc,
                    'cell--sorted-desc': this.props.filters.orderDesc
                } : null,
                displayValue ? {
                    'cell--best': result.bestScore,
                    'cell--highest-saving': result.highestSaving,
                    'cell--least-loss': result.leastLoss,
                    'cell--lossless': !result.isLossy,
                    'cell--lossy': result.isLossy
                } : 'cell--noop'
            );
        return (
            <td className={classes}>
                {this.format(displayName, displayValue)}
            </td>
            );
    }
});

module.exports = TableCell;
