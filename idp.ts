
// Import modules
import 'dotenv/config';
import fs from 'fs';
import DynamicSession from './types/DynamicSession';
import DynamicTask from './types/DynamicTask';
import { IgApiClient } from 'instagram-private-api';

const username: string = process.env.IG_USERNAME as string;
if (!username) DynamicSession.error('missingEnv', 'IG_USERNAME');
const password: string = process.env.IG_PASSWORD as string;
if (!password) DynamicSession.error('missingEnv', 'IG_PASSWORD');

const tasks: DynamicTask<IgApiClient>[] = [
  new DynamicTask((client: IgApiClient): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      const img = `./img/${Math.floor(Math.random() * 5) + 1}.jpeg`;
      console.log(`attempting to read file ${img}`);
      const promise = fs.promises.readFile(img);
      Promise.resolve(promise).then((buffer) => {
        //console.log(buffer);
        client.account.changeProfilePicture(buffer).then(() => {
          resolve();
        }).catch((error: Error) => reject(error))
      });
    });
  }),
]

const session = new DynamicSession({
  username,
  password,
  tasks,
});

session.start();

// function old() {

//   const execSync = require('child_process').execSync
//   const path = require('path')
//   const spawnSync = require('child_process').spawnSync
  
//   const { IgApiClient } = require('instagram-private-api');
//   const { sample } = require('lodash');
//   const DynamicAttribute = require('./types/DynamicAttribute.ts');
  
//   const ig = new IgApiClient();
//   // You must generate device id's before login.
//   // Id's generated based on seed
//   // So if you pass the same value as first argument - the same id's are generated every time
//   ig.state.generateDevice(process.env.IG_USERNAME);
//   // Optionally you can setup proxy url
//   ig.state.proxyUrl = process.env.IG_PROXY;
  
//   (async () => {
//     // Execute all requests prior to authorization in the real Android application
//     // Not required but recommended
//     await ig.simulate.preLoginFlow();
//     const loggedInUser = 
//       await ig.account.login(process.env.IG_USERNAME,
//                              process.env.IG_PASSWORD);
//     // The same as preLoginFlow()
//     // Optionally wrap it to process.nextTick so we dont need to wait ending of this bunch of requests
//     process.nextTick(async () => await ig.simulate.postLoginFlow());
//     // Create UserFeed instance to get loggedInUser's posts
//     const img = `./img/${Math.floor(Math.random() * 5) + 1}.jpeg`;
//     const rStream = createReadStream(img)
//     await ig.account.changeProfilePicture(rStream)
//       .then(() => {
//         console.log('fuck yea')
//       }).catch(err => console.error(err));
//   })()

// }