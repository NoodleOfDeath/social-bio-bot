import { IgApiClient } from 'instagram-private-api';
import DynamicTask from './DynamicTask';

interface Config {
  username: string;
  password: string;
  proxy?: string;
  tasks?: DynamicTask<IgApiClient>[];
};

class DynamicSessionError extends Error {
  
  constructor(msg: string) {
    super(msg);
    Object.setPrototypeOf(this, DynamicSessionError.prototype);
  }
  
}

enum ErrorType {
  unknown = "unknown",
  missingEnv = "missingEnv",
};

export interface IDynamicSession {
  start(): void;
  stop(): void;
}

export default class DynamicSession implements IDynamicSession {
  
  private config: Config;
  private tasks: DynamicTask<IgApiClient>[];
  private intervals: unknown[] = [];
  
  private ig: IgApiClient = new IgApiClient();
  
  public constructor(config: Config) {
    this.config = config;
    this.tasks = config.tasks || [];
    this.ig.state.generateDevice(config.username);
    if (config.proxy) this.ig.state.proxyUrl = config.proxy;
  }
  
  public static error(type: string, ...args: unknown[]) {
    let error = 'An unknown error occurred';
    switch (type) {
    case ErrorType.missingEnv.toString():
      if (args.length > 0) {
        error = `The following variable(s) is not set in .env but is required: ${args.reduce((prev: unknown, arg: unknown) => `${prev}, ${arg}`)}`;
      }
      break;
    default:
      break;
    }
    throw new DynamicSessionError(error);
  }
  
  public start() {
    console.log('starting session', this.intervals);
    this.ig.account.login(this.config.username,
                          this.config.password).then(() => {
      this.tasks.forEach((task) => {
        this.intervals.push(setInterval(() => {
          task.generate(this.ig).then(() => {
          }).catch((error: Error) => console.error(error));
        }, task.interval))
      })
      console.log(this.intervals.length);
    }).catch((error: Error) => console.error(error));
  }
  
  public stop() {
    console.log('stopping session', this.intervals);
    //this.intervals.forEach((id) => clearInterval(id));
    this.intervals = [];
  }
  
}
