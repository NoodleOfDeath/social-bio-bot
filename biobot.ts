#!/usr/bin/env ts-node

// Import modules
import 'dotenv/config';
import { ArgumentParser, RawDescriptionHelpFormatter } from 'argparse';
import * as colors from 'ansi-colors';
import { exit } from 'process';
import { version } from './package.json';
import { readdirSync } from 'fs';
import * as path from 'path';
import {
  EDPSocialPlatformShort,
  IBBCredentials,
  IBBHeadlessSession,
  DP_SOCIAL_PLATFORMS,
  enumList,
  abbrPlatform as platformShort,
} from './src';

const __this = path.basename(__filename);

class HelpFormatter extends RawDescriptionHelpFormatter {
  _split_lines(text: string, width: number) {
    return [].concat(...text.split('\n'));
  }
}

const parser = new ArgumentParser({
  description: [
    colors.yellowBright(`${__this} v${version}`),
    colors.cyanBright(
      'Lightweight library for creating a service that dynamically makes updates to a social profile account periodically.',
    ),
  ].join('\n'),
  formatter_class: HelpFormatter,
});

parser.add_argument('-v', '--version', { action: 'version', version });
parser.add_argument('-u', '--username', {
  help: 'supply social account username from stdin (overrides env variables)',
});
parser.add_argument('-p', '--password', {
  help: 'supply social account password from stdin (overrides env variables)',
});
parser.add_argument('platform', {
  nargs: '?',
  help: [
    colors.cyanBright('social platform to use'),
    colors.greenBright('Available platforms are:'),
    colors.greenBright(
      Object.values(DP_SOCIAL_PLATFORMS)
        .map(p => `- ${p.join(', ')}`)
        .join('\n'),
    ),
  ].join('\n'),
});
parser.add_argument('script', {
  nargs: '?',
  help: [
    colors.cyanBright('preset bot script to use'),
    `run ${colors.redBright(`${__this} ${colors.yellowBright(`<platform>`)}`)} to see what scripts are available`,
  ].join('\n'),
});

const args = parser.parse_args();

const scriptsDir = './scripts';
const assetsDir = './assets';

function exitWithError(error: string, kill = true) {
  console.error(error);
  if (kill) exit();
}

function missingArgument(argument: string, more: string = 'use -h or --help for more', kill = true) {
  exitWithError(`${colors.redBright(`\nYou must specify a ${colors.yellowBright(`<${argument}>`)}`)} ${more}\n`, kill);
}

function getPlatformScripts(platform: string): string[] {
  try {
    return readdirSync(path.resolve(`${scriptsDir}/${platform}`)).map(f =>
      f.replace(new RegExp(`^${platform}-|\.example\.ts$`, 'g'), ''),
    );
  } catch (_) {
    return [];
  }
}

const creds = new Map<EDPSocialPlatformShort, IBBCredentials>(
  enumList(EDPSocialPlatformShort).map(p => [
    p,
    { username: process.env[`${p.toUpperCase()}_USERNAME`], password: process.env[`${p.toUpperCase()}_PASSWORD`] },
  ]),
);

const platform = platformShort(args.platform as string);
if (!platform) {
  parser.print_help();
  exit();
}

const scripts = new Map<EDPSocialPlatformShort, string[]>(
  enumList(EDPSocialPlatformShort).map(p => [p, getPlatformScripts(p)]),
);

const script = args.script as string;
if (!script)
  missingArgument(
    'script',
    [
      '\n',
      colors.greenBright(`Available scripts for ${colors.yellowBright(`${platform}`)} are:`),
      colors.greenBright((scripts.get(platform) || []).map((s: string) => `- ${s}`).join('\n')),
    ].join('\n'),
  );

if (!scripts.get(platform).includes(script)) {
  exitWithError(`${script} is not a valid script for the platform ${platform}`);
}

let username = creds.get(platform).username || (args.username as string);
if (!username) missingArgument('username', 'You can also set this value in your environment. see .env-example');
let password = creds.get(platform).password || (args.password as string);
if (!password) missingArgument('password', 'You can also set this value in your environment. see .env-example');

import(`${scriptsDir}/${platform}/${platform}-${script}.example`)
  .then((module: { default: (props: Record<string, unknown>) => IBBHeadlessSession }) => {
    const session = module.default({ username, password, directory: `${assetsDir}/img` });
    session.start();
  })
  .catch((error: Error) => console.log(error));
