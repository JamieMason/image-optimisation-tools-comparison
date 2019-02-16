#!/usr/bin/env bash

rm -rf ./images/imagealpha-and-imageoptim
cp -R ./images/photoshop ./images/imagealpha-and-imageoptim
imageoptim --imagealpha './images/imagealpha-and-imageoptim/*'
