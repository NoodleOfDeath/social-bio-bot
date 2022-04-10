// Import modules
import 'dotenv/config';
import { resolve } from 'path';
import { IgCycleProfilePictureTask, IgDPSession } from '../src';

const username: string = process.env.IG_USERNAME as string;
if (!username)
  console.error(
    'Missing IG_USERNAME environment variable in .env file. View README and/or .env.example file on how to fix this.',
  );
const password: string = process.env.IG_PASSWORD as string;
if (!password)
  console.error(
    'Missing IG_PASSWORD environment variable in .env file. View README and/or .env.example file on how to fix this.',
  );

const session = new IgDPSession({
  username,
  password,
  tasks: [new IgCycleProfilePictureTask(resolve('./img'))],
});

session.start();
