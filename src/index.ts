import results = require('./data/results.json');

export const getEmptyResults = () => ({
  ['codekit']: null,
  ['imagemin']: null,
  ['image_optim']: null,
  ['imagealpha-and-imageoptim']: null,
  ['imageoptim']: null,
  ['jpegmini-and-imageoptim']: null,
  ['kraken']: null,
  ['photoshop']: null,
  ['smushit']: null,
  ['tinypng']: null,
  ['worst']: null // check it's ok to add this
});

export interface IResult {
  isBestScore: boolean;
  isHighestSaving: boolean;
  isLeastLoss: boolean;
  isLossy: boolean;
  lossPercent: number;
  originalSize: number;
  score: number;
  size: number;
  sizeSaving: number;
  sizeSavingPercent: number;
  ssim: number;
  worstSsimPossible: number;
}

export type ToolName = keyof ReturnType<typeof getEmptyResults>;

export interface ISubject {
  imageName: string;
  toolName: ToolName;
}

export interface IImage {
  extension: string;
  name: string;
  results: { [toolName in ToolName]: IResult | null };
  type: string;
}

export interface IResultMemo {
  bestScore: number;
  highestSaving: number;
  image: IImage;
  leastLoss: number;
}

export const getResults = (): IImage[] => results;
