import { createApolloFetch } from "apollo-fetch";
import * as face from 'face-api.js'
const canvas = require("canvas")



const token = process.env.GITHUB_ACCESS_TOKEN;

export const analyzeProfile = (username: string): any => {
  const fetch = createApolloFetch({
    uri: "https://api.github.com/graphql"
  });

  fetch.use(({ options }, next) => {
    if (!options.headers) {
      options.headers = {};
    }
    options.headers["Authorization"] = `bearer ${token}`;
    next();
  });

  return fetch({
    query: `{
              user(login: "${username}") {
                avatarUrl
                bio
                email
                isHireable
                location
                name
                websiteUrl
                pinnedRepositories {
                    totalCount
                }
              } 
            }`
  })
    .then(res => {
      console.log('RES DATA=', res)
      const user = res.data.user;
      const image = `${user.avatarUrl}`;
      let score = 0;
      let profileStats = {
        bio: true,
        email: true,
        isHireable: true,
        location: true,
        name: true,
        websiteUrl: true,
        pinnedRepositories: true,
        picture: true
      };

      const data1 = new Promise(resolve => {
        user.bio ? (score += 5) : (profileStats.bio = false);
        user.email ? (score += 5) : (profileStats.email = false);
        user.isHireable ? (score += 5) : (profileStats.isHireable = false);
        user.location ? (score += 5) : (profileStats.location = false);
        user.name ? (score += 5) : (profileStats.name = false);
        user.websiteUrl ? (score += 5) : (profileStats.websiteUrl = false);
        user.pinnedRepositories.totalCount > 0
          ? (score += 10)
          : (profileStats.pinnedRepositories = false);
        resolve();
      });


      const { Canvas, Image, ImageData } = canvas
      face.env.monkeyPatch({ Canvas, Image, ImageData })

      const faceDetectionNet = face.nets.ssdMobilenetv1

      // SsdMobilenetv1Options
      const minConfidence = 0.5

      // TinyFaceDetectorOptions
      const inputSize = 408
      const scoreThreshold = 0.5

      // MtcnnOptions
      const minFaceSize = 50
      const scaleFactor = 0.8

      function getFaceDetectorOptions(net) {
        return net === face.nets.ssdMobilenetv1
          ? new face.SsdMobilenetv1Options({ minConfidence })
          : (net === face.nets.tinyFaceDetector
            ? new face.TinyFaceDetectorOptions({ inputSize, scoreThreshold })
            : new face.MtcnnOptions({ minFaceSize, scaleFactor })
          )
      }

      const faceDetectionOptions = getFaceDetectorOptions(faceDetectionNet)


      const getIMG = async () => {
        await faceDetectionNet.loadFromDisk('weights')
        await face.nets.faceLandmark68Net.loadFromDisk('weights')

        console.log(image)
        const img = await canvas.loadImage(image)
        const result = await face.detectAllFaces(img, faceDetectionOptions)
        console.log(result)
      }

      const result = getIMG()

      const data2 = new Promise(resolve => {
        if (result) (profileStats.picture = false);
        resolve();
      });

      return Promise.all([data1, data2]).then(() => {
        return { username, score, profileStats };
      });
    })
    .catch(e => e);
};
