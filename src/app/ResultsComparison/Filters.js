'use strict';

// 3rd party modules
var React = require('react');

// components
var Option = require('./Option');
var Toggle = require('./Toggle');

// public
var Filters = React.createClass({
    propTypes: {
        filters: React.PropTypes.object.isRequired,
        onOption: React.PropTypes.func.isRequired,
        onToggle: React.PropTypes.func.isRequired
    },
    render: function() {
        var filters = this.props.filters;
        var onOption = this.props.onOption;
        var onToggle = this.props.onToggle;
        return (
            <div>
                <fieldset className="filters filters--tools">
                    <legend className="filters__label">
                        Visible Tools
                    </legend>
                    <Toggle onChange={onToggle} filters={filters} name="codekit" />
                    <Toggle onChange={onToggle} filters={filters} name="grunt-contrib-imagemin" />
                    <Toggle onChange={onToggle} filters={filters} name="image_optim" />
                    <Toggle onChange={onToggle} filters={filters} name="imagealpha-and-imageoptim" />
                    <Toggle onChange={onToggle} filters={filters} name="imageoptim" />
                    <Toggle onChange={onToggle} filters={filters} name="jpegmini-and-imageoptim" />
                    <Toggle onChange={onToggle} filters={filters} name="kraken" />
                    <Toggle onChange={onToggle} filters={filters} name="photoshop" />
                    <Toggle onChange={onToggle} filters={filters} name="smushit" />
                    <Toggle onChange={onToggle} filters={filters} name="tinypng" />
                </fieldset>
                <fieldset className="filters filters--display">
                    <legend className="filters__label">
                        Visible Metric
                    </legend>
                    <Option onChange={onOption} filters={filters} name="displayValue" value="sizeSavingPercent">
                        Size Saving %
                    </Option>
                    <Option onChange={onOption} filters={filters} name="displayValue" value="lossPercent">
                        Quality Loss %
                    </Option>
                    <Option onChange={onOption} filters={filters} name="displayValue" value="sizeSaving">
                        Bytes Removed
                    </Option>
                    <Option onChange={onOption} filters={filters} name="displayValue" value="score">
                        Overall Score
                    </Option>
                    <Option onChange={onOption} filters={filters} name="displayValue" value="ssim">
                        SSIM
                    </Option>
                </fieldset>
                <div className="pack">
                    <div className="pack__item pack__item--extensions">
                        <fieldset className="filters filters--extensions">
                            <legend className="filters__label">
                                Visible File Types
                            </legend>
                            <Toggle onChange={onToggle} filters={filters} name="gif" />
                            <Toggle onChange={onToggle} filters={filters} name="png" />
                            <Toggle onChange={onToggle} filters={filters} name="jpg" />
                        </fieldset>
                    </div>
                    <div className="pack__item">
                        <fieldset className="filters filters--options">
                            <legend className="filters__label">
                                Options
                            </legend>
                            <Toggle onChange={onToggle} filters={filters} name="roundNumbers" />
                        </fieldset>
                    </div>
                </div>
            </div>
            );
    }
});

module.exports = Filters;
