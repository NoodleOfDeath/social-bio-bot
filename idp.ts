
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

const images = fs.readdirSync('./img');

let num = 0;
const tasks: DynamicTask<IgApiClient>[] = [
  new DynamicTask((client: IgApiClient): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      let new_num = Math.floor(Math.random() * images.length);
      while (new_num === num)
        new_num = Math.floor(Math.random() * images.length);
      num = new_num;
      const img = `./img/${images[num]}`;
      console.log(`attempting to read file ${img}`);
      const promise = fs.promises.readFile(img);
      Promise.resolve(promise).then((buffer) => {
        //console.log(buffer);
        client.account.changeProfilePicture(buffer).then(() => {
          resolve();
        }).catch((error: Error) => reject(error))
      });
    });
  }, 20000),
]

const session = new DynamicSession({
  username,
  password,
  tasks,
});

session.start();
