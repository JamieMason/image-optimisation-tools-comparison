'use strict';

// 3rd party modules
var React = require('react');

// components
var TableHeader = require('./TableHeader');
var TableCell = require('./TableCell');

// public
var Table = React.createClass({
    propTypes: {
        filters: React.PropTypes.object.isRequired,
        onOrderChange: React.PropTypes.func.isRequired,
        results: React.PropTypes.array.isRequired
    },
    renderRow: function(image) {
        return (
            <tr key={image.name}>
                <th className="cell cell--name" scope="row">
                    {image.name}
                </th>
                <TableCell data={image} filters={this.props.filters} tool="codekit" />
                <TableCell data={image} filters={this.props.filters} tool="grunt-contrib-imagemin" />
                <TableCell data={image} filters={this.props.filters} tool="image_optim" />
                <TableCell data={image} filters={this.props.filters} tool="imagealpha-and-imageoptim" />
                <TableCell data={image} filters={this.props.filters} tool="imageoptim" />
                <TableCell data={image} filters={this.props.filters} tool="jpegmini-and-imageoptim" />
                <TableCell data={image} filters={this.props.filters} tool="kraken" />
                <TableCell data={image} filters={this.props.filters} tool="photoshop" />
                <TableCell data={image} filters={this.props.filters} tool="smushit" />
                <TableCell data={image} filters={this.props.filters} tool="tinypng" />
            </tr>
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
