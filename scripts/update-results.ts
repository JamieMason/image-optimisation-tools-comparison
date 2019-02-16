import * as execa from 'execa';
import { pathExists, readJson, stat, writeJson } from 'fs-extra';
import * as globby from 'globby';
import { diffString } from 'json-diff';
import * as path from 'path';
import { getEmptyResults, IImage, IResult, IResultMemo, ISubject, ToolName } from '../src/index';

const getPath = ({ toolName, imageName }: ISubject) =>
  path.resolve(`images/${toolName}/${imageName}`);
const exists = (subject: ISubject) => pathExists(getPath(subject));
const getSize = (subject: ISubject) => stat(getPath(subject)).then(({ size }) => size);
const getType = (imageName: string) =>
  imageName.endsWith('png') ? 'PNG' : imageName.endsWith('gif') ? 'GIF' : 'JPG';
const largest = (a: number, b: number) => (a > b ? a : b);

const getSsim = async ({ toolName, imageName }: ISubject) => {
  const original = getPath({ toolName: 'photoshop', imageName });
  const optimised = getPath({ toolName, imageName });
  const { stdout } = await execa('pyssim', [original, optimised]);
  const ssim = parseFloat(stdout);
  return ssim;
};

const getLossPercent = (isLossy: boolean, worstSsimPossible: number, ssim: number) => {
  const whole = 1 - ssim;
  const part = 1 - worstSsimPossible;
  return isLossy && whole > 0 && part > 0 ? (whole / part) * 100 : 0;
};

const getResult = async (
  originalSize: number,
  worstSsimPossible: number,
  { toolName, imageName }: ISubject
) => {
  const [size, ssim] = await Promise.all([
    getSize({ toolName, imageName }),
    getSsim({ toolName, imageName })
  ]);
  const sizeSaving = originalSize - size;
  const isLossy = ssim < 1 && worstSsimPossible < 1;
  const sizeSavingPercent = (sizeSaving / originalSize) * 100;
  const lossPercent = getLossPercent(isLossy, worstSsimPossible, ssim);
  const score = sizeSavingPercent - lossPercent * 2;
  const result: IResult = {
    isBestScore: false,
    isHighestSaving: false,
    isLeastLoss: false,
    isLossy,
    lossPercent,
    originalSize,
    score,
    size,
    sizeSaving,
    sizeSavingPercent,
    ssim,
    worstSsimPossible
  };
  return result;
};

(async function run() {
  const root = path.resolve(__dirname, '..');
  const resultsPath = path.resolve(root, './src/data/results.json');
  const imageNames = await globby([`*.+(png|gif|jpg|jpeg)`], { cwd: `${root}/images/photoshop` });
  const toolNames = Object.keys(getEmptyResults()) as ToolName[];
  const results: IImage[] = [];

  for (const imageName of imageNames) {
    const extension = getType(imageName);
    const type = imageName.split('_')[0];
    const originalSize = await getSize({ toolName: 'photoshop', imageName });
    const worstSsimPossible =
      extension === 'GIF' ? 1 : await getSsim({ toolName: 'worst', imageName });
    const memo: IResultMemo = {
      bestScore: 0,
      highestSaving: 0,
      image: {
        extension,
        name: imageName,
        results: getEmptyResults(),
        type
      },
      leastLoss: 0
    };

    await Promise.all(
      toolNames.map(async (toolName) => {
        if (await exists({ toolName, imageName })) {
          const result = await getResult(originalSize, worstSsimPossible, { toolName, imageName });
          memo.image.results[toolName] = result;
          memo.bestScore = largest(result.score, memo.bestScore);
          memo.highestSaving = largest(result.sizeSaving, memo.highestSaving);
          memo.leastLoss = largest(result.ssim, memo.leastLoss);
        }
      })
    );

    console.log(imageName);

    for (const toolName of toolNames) {
      const result = memo.image.results[toolName];
      if (result !== null) {
        result.isBestScore = result.score === memo.bestScore;
        result.isHighestSaving = result.sizeSaving === memo.highestSaving;
        result.isLeastLoss = result.sizeSaving > 0 && result.ssim === memo.leastLoss;
        results.push(memo.image);
        console.log(
          [
            toolName,
            result.isBestScore ? ' Best Score' : '',
            result.isHighestSaving ? ' Highest Saving' : '',
            result.isLeastLoss ? ' Least Loss' : ''
          ].join('')
        );
      } else {
        console.log(toolName, 'has no result');
      }
    }
  }

  const previousResults = await readJson(resultsPath);
  await writeJson(resultsPath, results, { spaces: 2 });
  console.log(diffString(previousResults, results));
})();
