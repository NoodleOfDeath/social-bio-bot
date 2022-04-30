# social-bio-bot

[![npm](https://img.shields.io/npm/dm/social-bio-bot.svg?maxAge=600)](https://www.npmjs.com/package/social-bio-bot)
[![npm](https://img.shields.io/npm/l/social-bio-bot.svg?maxAge=600)](https://github.com/noodleofdeath/instagram-private-api/blob/main/LICENSE)

---

This library is designed to automate dynamic updates to an social profile
account such as cycling through profile pictures every 30 seconds.

**Note**: the default refresh interval is set to 30000ms (30 seconds) for most
dynamic tasks. If this interval is set below 20 seconds, there is a chance
APIs will block requests if more than 200 are made within an hour.

---

## Table of Contents

- [Run the Bot](#run-the-bot)
- [Install](#install)
- [Examples](#examples)
- [Support us](#support-us)
- [Contribution](#contribution)
- [Useful Links](#useful-links)

## Run the Bot

You can run this bot from the command line directly (Docker support soon to be
added).

### Running from command line

```bash
$ git clone https://github.com/NoodleOfDeath/social-bio-bot
$ cd social-bio-bot
$ ./sbiotbot.ts
sbiobot.ts v0.0.1
usage: sbiobot.ts [-h] [-v] [-u USERNAME] [-p PASSWORD] [platform] [script]
Lightweight library for creating a service that dynamically makes updates to a social profile account periodically.

positional arguments:
  platform              social platform to use
                        Available platforms are:
                        - fb, facebook
                        - ig, instagram
                        - tw, twitter
  script                preset bot script to use
                        run sbiobot.ts <platform> to see what scripts are available

optional arguments:
  -h, --help            show this help message and exit
  -v, --version         show program's version number and exit
  -u USERNAME, --username USERNAME
                        supply social account username from stdin (overrides env variables)
  -p PASSWORD, --password PASSWORD
                        supply social account password from stdin (overrides env variables)
```

### Docker

TBC

## Install with NPM for Development

From npm

```bash
npm install social-bio-bot
```

From github

```bash
npm install github:noodleofdeath/social-bio-bot
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

TBC

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
