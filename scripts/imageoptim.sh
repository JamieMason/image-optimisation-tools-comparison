#!/usr/bin/env bash

rm -rf ./images/imageoptim
cp -R ./images/photoshop ./images/imageoptim
imageoptim './images/imageoptim/*'
