'use strict';

// 3rd party modules
var React = require('react');

// public
var Intro = React.createClass({
    render: function() {
        return (
            <div>
                <h1>Benchmarks of Image Optimisation Tools</h1>
                <p>Speeding up images often comes with a cost in picture quality and finding the right balance can be difficult.</p>
                <p>Here we compare the results of several image optimisation tools.</p>
                <p className="shields">
                    <a href="https://twitter.com/fold_left" target="_blank" className="shields__item shields__item--twitter">
                        <img src="https://img.shields.io/twitter/follow/fold_left.svg?style=social" alt="Follow @fold_left on Twitter" />
                    </a>
                    <a href="https://github.com/JamieMason" target="_blank" className="shields__item shields__item--github">
                        <img src="https://img.shields.io/github/followers/JamieMason.svg?style=social&label=Follow" alt="Follow @fold_left on Twitter" />
                    </a>
                </p>
            </div>
            );
    }
});

module.exports = Intro;
