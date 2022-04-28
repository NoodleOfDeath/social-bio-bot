// Import modules
import { resolve } from 'path';
import { IgDPCycleProfilePictureTask, IgDPSession } from '../../src';

// Cycle profile picture with images found in `props.directory` every 30 seconds.
const session = (props: { username: string; password: string; directory: string; interval?: number }) =>
  new IgDPSession({
    ...props,
    tasks: [new IgDPCycleProfilePictureTask(resolve(props.directory), props.interval > 0 ? props.interval : 30000)],
  });

export default session;
