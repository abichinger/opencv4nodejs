import { cv, getDataFilePath, drawBlueRect } from '../utils';

const classifier = new cv.CascadeClassifier(cv.HAAR_FRONTALFACE_ALT2);

cv.imreadAsync(getDataFilePath('got.jpg'))
  .then(img =>
    img.bgrToGrayAsync()
      .then(grayImg => classifier.detectMultiScaleAsync(grayImg))
      .then(
        (res) => {
          const { objects, numDetections } = res;
          if (!objects.length) {
            return Promise.reject('No faces detected!');
          }

          // draw detection
          const facesImg = img.copy();
          const numDetectionsTh = 10;
          objects.forEach((rect, i) => {
            const thickness = numDetections[i] < numDetectionsTh ? 1 : 2;
            drawBlueRect(facesImg, rect, { thickness });
          });

          return facesImg;
        }
      )
      .then((facesImg) => {
        cv.imshowWait('face detection', facesImg);
      })
    )
    .catch(err => console.error(err));

