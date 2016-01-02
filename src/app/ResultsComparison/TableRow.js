'use strict';

// 3rd party modules
var React = require('react');

// components
var TableCell = require('./TableCell');

// public
var TableRow = React.createClass({
    propTypes: {
        filters: React.PropTypes.object.isRequired,
        image: React.PropTypes.object.isRequired
    },
    render: function() {
        var image = this.props.image;
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
    }
});

module.exports = TableRow;
