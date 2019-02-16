#!/usr/bin/env bash

rm -rf ./images/jpegmini-and-imageoptim
cp -R ./images/photoshop ./images/jpegmini-and-imageoptim
imageoptim --jpegmini './images/jpegmini-and-imageoptim/*'
