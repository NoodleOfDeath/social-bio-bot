// Import modules
import { resolve } from 'path';
import { IIgCycleProfilePictureTask, ISessionIG } from '../../src';

// Cycle profile picture with images found in `props.directory` every 30 seconds.
const session = (props: { username: string; password: string; directory: string; interval?: number }) =>
  new ISessionIG({
    ...props,
    tasks: [new IIgCycleProfilePictureTask(resolve(props.directory), props.interval > 0 ? props.interval : 3000)],
  });

export default session;
