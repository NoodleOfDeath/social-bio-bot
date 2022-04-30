import { ESocialPlatform } from '.';
import { ESocialPlatformShort } from './social-platform.enum';
import { enumList } from './utils';

export const SECOND = 1000;
export const MINUTE = 60 * SECOND;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;
export const DEFAULT_CYCLE_RATE = 5 * MINUTE; // 5 minutes

export const SOCIAL_PLATFORMS_SHORT = enumList(ESocialPlatformShort);

export const SOCIAL_PLATFORMS = {
  fb: [ESocialPlatformShort.fb, ESocialPlatform.facebook],
  ig: [ESocialPlatformShort.ig, ESocialPlatform.instagram],
  tw: [ESocialPlatformShort.tw, ESocialPlatform.twitter],
};
