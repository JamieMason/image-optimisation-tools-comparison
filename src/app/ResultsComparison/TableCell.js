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
            displayValue = displayValue.toFixed(2);
        }
        if (displayName.endsWith('Percent')) {
            return `${displayValue}%`;
        }
        return displayValue;
    },
    render: function() {
        var result = this.props.data[this.props.tool];
        var toolName = this.props.tool;
        var filters = this.props.filters;
        var displayName = filters.displayValue;
        var displayValue = result[displayName];
        var isHidden = filters[toolName] === false;
        var isSorted = filters.orderBy === toolName;
        var classes = isHidden ?
            'hidden' : classNames(
                'cell',
                'cell--' + toolName,
                isSorted ? {
                    'cell--sorted': isSorted,
                    'cell--sorted-asc': !filters.orderDesc,
                    'cell--sorted-desc': filters.orderDesc
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
                <a className="cell__value" href={`https://raw.githubusercontent.com/JamieMason/image-optimisation-tools-comparison/master/images/${toolName}/${this.props.data.name}`} target="_blank">
                    {this.format(displayName, displayValue)}
                </a>
            </td>
            );
    }
});

module.exports = TableCell;
