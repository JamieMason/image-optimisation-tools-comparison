'use strict';

// 3rd party modules
var React = require('react');

// components
var TableHeader = require('./TableHeader');
var TableRow = require('./TableRow');

// public
var Table = React.createClass({
    propTypes: {
        filters: React.PropTypes.object.isRequired,
        onOrderChange: React.PropTypes.func.isRequired,
        results: React.PropTypes.array.isRequired
    },
    renderRow: function(image) {
        return (
            <TableRow key={image.name} filters={this.props.filters} image={image} />
            );
    },
    render: function() {
        if (this.props.results.length === 0) {
            return (
                <div>
                    No results match your search.
                </div>
                );
        }
        return (
            <table>
                <thead>
                    <tr>
                        <TableHeader filters={this.props.filters} onOrderChange={this.props.onOrderChange} tool="name" />
                        <TableHeader filters={this.props.filters} onOrderChange={this.props.onOrderChange} tool="codekit" />
                        <TableHeader filters={this.props.filters} onOrderChange={this.props.onOrderChange} tool="grunt-contrib-imagemin" />
                        <TableHeader filters={this.props.filters} onOrderChange={this.props.onOrderChange} tool="image_optim" />
                        <TableHeader filters={this.props.filters} onOrderChange={this.props.onOrderChange} tool="imagealpha-and-imageoptim" />
                        <TableHeader filters={this.props.filters} onOrderChange={this.props.onOrderChange} tool="imageoptim" />
                        <TableHeader filters={this.props.filters} onOrderChange={this.props.onOrderChange} tool="jpegmini-and-imageoptim" />
                        <TableHeader filters={this.props.filters} onOrderChange={this.props.onOrderChange} tool="kraken" />
                        <TableHeader filters={this.props.filters} onOrderChange={this.props.onOrderChange} tool="photoshop" />
                        <TableHeader filters={this.props.filters} onOrderChange={this.props.onOrderChange} tool="smushit" />
                        <TableHeader filters={this.props.filters} onOrderChange={this.props.onOrderChange} tool="tinypng" />
                    </tr>
                </thead>
                <tbody>
                    {this.props.results.map(this.renderRow)}
                </tbody>
            </table>
            );
    }
});

module.exports = Table;
