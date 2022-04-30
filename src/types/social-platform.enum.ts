export enum ESocialPlatform {
  facebook = 'facebook',
  instagram = 'instagram',
  twitter = 'twitter',
}

export enum ESocialPlatformShort {
  fb = 'fb',
  ig = 'ig',
  tw = 'tw',
}

export function shortenPlatform(platform: ESocialPlatform | string): ESocialPlatformShort {
  const map = {
    facebook: ESocialPlatformShort.fb,
    instagram: ESocialPlatformShort.ig,
    twitter: ESocialPlatformShort.tw,
  };
  return map[platform] || platform;
}
