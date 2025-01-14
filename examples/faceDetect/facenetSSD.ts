import { cv, getDataFilePath } from '../utils';
import { makeRunDetectFacenetSSD } from './commons';

const runDetection = makeRunDetectFacenetSSD();

const minConfidence = 0.15;
cv.imshow('got', runDetection(cv.imread(getDataFilePath('got.jpg')), minConfidence));
cv.imshow('Lenna', runDetection(cv.imread(getDataFilePath('Lenna.png')), minConfidence));
cv.waitKey();

