#!/usr/bin/env bash

rm -rf ./images/imagemin
cp -R ./images/photoshop ./images/imagemin
imagemin ./images/photoshop --out-dir=./images/imagemin
