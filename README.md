# instagram-dynamic-profile library

![logo](https://cloud.githubusercontent.com/assets/1809268/15931032/2792427e-2e56-11e6-831e-ffab238cc4a2.png)

[![npm](https://img.shields.io/npm/dm/instagram-dynamic-profile.svg?maxAge=600)](https://www.npmjs.com/package/instagram-dynamic-profile)
[![npm](https://img.shields.io/npm/l/instagram-dynamic-profile.svg?maxAge=600)](https://github.com/noodleofdeath/instagram-private-api/blob/main/LICENSE)

---

This library uses the [`instagram-private-api`](https://www.npmjs.com/package/instagram-private-api)
to automate dynamic updates to an Instagram profile such as cycling through
profile pictures every 30 seconds.

**Note**: the default refresh interval is set to 30000ms (30 seconds) for most
dynamic tasks. If this interval is set below 20 seconds, there is a chance
Instagrams API will block requests if more than 200 are made within an hour.

---

## Table of Contents

- [Install](#install)
- [Support us](#support-us)
- [Examples](#examples)
- [Contribution](#contribution)

## Install

From npm

```bash
npm install instagram-dynamic-profile
```

From github

```bash
npm install github:noodleofdeath/instagram-dynamic-profile
```

This package uses [`url-regex-safe`](https://www.npmjs.com/package/url-regex-safe) ([GitHub](https://github.com/spamscanner/url-regex-safe)) to check for links when sending direct messages.
By default, the **safe** regex engine [`re2`](https://github.com/uhop/node-re2) is **not** installed.
⚠ It's highly recommended for you to install `re2` by running `npm install re2`, else you _will_ be vulnerable to [CVE-2020-7661](https://nvd.nist.gov/vuln/detail/CVE-2020-7661).

## Support us

If you find this library useful for you, you can support it by donating any amount

BTC: 3HNXnygb1HowTBbvhQrQ4vxekfQ2UM83sd
SHIB: 0xBb8f7EbF3D7f54BAcadece3dada9ab2358C90635
ETH: 0xec78f794489D511137770Ae144A550B50c2AFF92

## Examples

You can find usage examples [here](examples).

Be sure to create a `.env` file in your project root with your Instagram
credentials and match the format of [`.env.example`](.env.example).

_Note for JavaScript users:_
As of Node v.13.5.0, there isn't support for ESModules and the 'import'-syntax.
So you have to read the imports in the examples like this:

`import { A } from 'b'` ➡ `const { A } = require('b')`

```typescript
// Import modules
import 'dotenv/config';
import { resolve } from 'path';
import { exit } from 'process';
import { IgCycleProfilePictureTask, IgDPSession } from 'instagram-dynamic-profile';

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

const session = new IgDPSession({
  username,
  password,
  tasks: [new IgCycleProfilePictureTask(resolve('./img'))],
});

session.start();
```

## Debugging

In order to get debug infos provided by the library, you can enable debugging.
The prefix for this library is `ig`.
To get all debug logs (_recommended_) set the namespace to `ig:*`.

## Node

In Node you only have to set the environment variable `DEBUG` to the desired namespace.
[Further information](https://github.com/visionmedia/debug#environment-variables)

## Contribution

If you need features that is not implemented - feel free to implement and create PRs!

Plus we need some documentation, so if you are good in it - you are welcome.

Setting up your environment is described [here](CONTRIBUTING.md).

## Useful links

[instagram-id-to-url-segment](https://www.npmjs.com/package/instagram-id-to-url-segment) - convert the image url fragment to the media ID
