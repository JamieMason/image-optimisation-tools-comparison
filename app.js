'use strict';

// 3rd party modules
const childProcess = require('child_process');
const deferred = require('deferred');
const fs = require('fs');
const path = require('path');
const exec = deferred.promisify(childProcess.exec);
const execFile = deferred.promisify(childProcess.execFile);
const glob = deferred.promisify(require('glob'));
const stat = deferred.promisify(fs.stat);

// implementation

async function start() {
    const imageNames = await getImageNames();
    const toolNames = await getToolNames();
    const total = imageNames.length * toolNames.length;
    let i = 1;
    let images = [];
    for (let imageName of imageNames) {
        let highestSaving = 0;
        let leastLoss = 0;
        let image = {
            name: imageName,
            type: imageName.split('_')[0],
            extension: getType(imageName)
        };
        for (let toolName of toolNames) {
            console.log(`${i++}/${total} ${imageName} ${toolName}`);
            if (await exists(toolName, imageName)) {
                let result = await getResult(toolName, imageName);
                highestSaving = largest(result.sizeSaving, highestSaving);
                leastLoss = largest(result.ssim, leastLoss);
                image[toolName] = result;
            }
        }
        for (let toolName of toolNames) {
            if (await exists(toolName, imageName)) {
                let result = image[toolName];
                result.highestSaving = result.sizeSaving === highestSaving;
                result.leastLoss = result.sizeSaving > 0 && result.ssim === leastLoss;
            }
        }
        images.push(image);
    }
    return images;
}

function largest(a, b) {
    return a > b ? a : b;
}

async function getResult(toolName, imageName) {
    const originalSize = await getSize('photoshop', imageName);
    const size = await getSize(toolName, imageName);
    const sizeSaving = originalSize - size;
    const ssim = await getSsim(imageName, toolName);
    const worstSsimPossible = await getSsim(imageName, 'worst');
    const isLossy = ssim < 1;
    return {
        isLossy: isLossy,
        lossPercent: isLossy ? ((1 - ssim) / (1 - worstSsimPossible)) * 100 : 0,
        size: size,
        sizeSaving: sizeSaving,
        sizeSavingPercent: (sizeSaving / originalSize) * 100,
        ssim: ssim
    };
}

start()
    .then(results => {
        const writeTo = `${__dirname}/results.json`;
        fs.writeFileSync(writeTo, JSON.stringify(results, null, 4));
        console.log(writeTo);
    });

function getToolNames() {
    return glob('*', {
        cwd: 'images'
    });
}

function getImageNames() {
    return glob('*.+(png|gif|jpg|jpeg)', {
        cwd: 'images/photoshop'
    });
}

function getImagePaths() {
    return glob('images/**/*.+(png|gif|jpg)');
}

function exists(toolName, imageName) {
    return stat(getPath(toolName, imageName))
        .then(() => true, () => false);
}

function getPath(toolName, imageName) {
    return path.resolve(`images/${toolName}/${imageName}`);
}

function getSize(toolName, imageName) {
    return stat(getPath(toolName, imageName))
        .then(stats => stats.size);
}

function getSsim(imageName, toolName) {
    const original = getPath('photoshop', imageName);
    const optimised = getPath(toolName, imageName);
    return exec(`pyssim "${original}" "${optimised}"`)
        .then(stdout => parseFloat(stdout[0]));
}

function getType(imageName) {
    return imageName.endsWith('png') ?
        'PNG' : imageName.endsWith('gif') ?
        'GIF' : 'JPG';
}
