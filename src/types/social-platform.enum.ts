export enum EDPSocialPlatform {
  fb = 'fb',
  facebook = 'facebook',
  ig = 'ig',
  instagram = 'instagram',
  tw = 'tw',
  twitter = 'twitter',
}

export enum EDPSocialPlatformShort {
  fb = 'fb',
  ig = 'ig',
  tw = 'tw',
}

export function abbrPlatform(platform: EDPSocialPlatform | string): EDPSocialPlatformShort {
  const map = {
    facebook: EDPSocialPlatformShort.fb,
    instagram: EDPSocialPlatformShort.ig,
    twitter: EDPSocialPlatformShort.tw,
  };
  return map[platform] || platform;
}
