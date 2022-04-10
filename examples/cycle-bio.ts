// Import modules
import 'dotenv/config';
import { exit } from 'process';
import { IgDPCycleBioTask, IgDPSession } from '../src/node';

const username: string = process.env.IG_USERNAME as string;
if (!username) {
  console.error(
    'Missing IG_USERNAME environment variable in .env file.\nView README and/or .env.example file on how to fix this.',
  );
  exit();
}
const password: string = process.env.IG_PASSWORD as string;
if (!password) {
  console.error(
    'Missing IG_PASSWORD environment variable in .env file.\nView README and/or .env.example file on how to fix this.',
  );
  exit();
}

// Cycle profile picture with images found in `./img` every 30 seconds.
const session = new IgDPSession({
  username,
  password,
  tasks: [
    new IgDPCycleBioTask((): string => {
      return `Today's timestamp is:\n${new Date()}`;
    }),
  ],
});

session.start();
