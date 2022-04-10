import { IgApiClient } from 'instagram-private-api';
import { IDPSession } from 'src/types/session';
import { ITask } from '../types';

interface Config {
  username: string;
  password: string;
  proxy?: string;
  tasks?: ITask<IDPSession<IgApiClient>>[];
}

export class IgDPSession implements IDPSession<IgApiClient> {
  private config: Config;
  private tasks: ITask<IDPSession<IgApiClient>>[];
  private intervals: NodeJS.Timeout[] = [];

  private ig: IgApiClient = new IgApiClient();

  public constructor(config: Config) {
    this.config = config;
    this.tasks = config.tasks || [];
    this.ig.state.generateDevice(config.username);
    if (config.proxy) this.ig.state.proxyUrl = config.proxy;
  }

  public get client(): IgApiClient {
    return this.ig;
  }

  public start() {
    this.ig.account
      .login(this.config.username, this.config.password)
      .then(() => {
        this.tasks.forEach(task => {
          task
            .generate(this)
            .then(() => {})
            .catch((error: Error) => console.error(error));
          this.intervals.push(
            setInterval(() => {
              task
                .generate(this)
                .then(() => {})
                .catch((error: Error) => console.error(error));
            }, task.interval),
          );
        });
      })
      .catch((error: Error) => console.error(error));
  }

  public stop() {
    this.intervals.forEach(id => clearInterval(id));
    this.intervals = [];
  }
}
