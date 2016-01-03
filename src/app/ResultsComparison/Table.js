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
                        <TableHeader filters={this.props.filters} tool="name" />
                        <TableHeader filters={this.props.filters} tool="codekit" />
                        <TableHeader filters={this.props.filters} tool="grunt-contrib-imagemin" />
                        <TableHeader filters={this.props.filters} tool="image_optim" />
                        <TableHeader filters={this.props.filters} tool="imagealpha-and-imageoptim" />
                        <TableHeader filters={this.props.filters} tool="imageoptim" />
                        <TableHeader filters={this.props.filters} tool="jpegmini-and-imageoptim" />
                        <TableHeader filters={this.props.filters} tool="kraken" />
                        <TableHeader filters={this.props.filters} tool="photoshop" />
                        <TableHeader filters={this.props.filters} tool="smushit" />
                        <TableHeader filters={this.props.filters} tool="tinypng" />
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
