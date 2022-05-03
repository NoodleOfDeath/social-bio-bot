// Import modules
import { IIgCycleBioTask, ISessionIG } from '../../src';

// Cycles profile bio
const session = (props: { username: string; password: string; bio?: string; interval?: number }) =>
  new ISessionIG({
    ...props,
    tasks: [
      new IIgCycleBioTask((): string => {
        return props.bio || `Today's timestamp is:\n${new Date()}`;
      }, props.interval !== undefined ? props.interval : 30000),
    ],
  });

export default session;
