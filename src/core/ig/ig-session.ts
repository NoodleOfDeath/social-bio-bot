import { IgApiClient as ClientIG } from 'instagram-private-api';
import { ISessionConfig, ISession, ITask } from '../../types';

export class ISessionIG implements ISession<ClientIG> {
  private config: ISessionConfig<ClientIG>;
  private tasks: ITask<ClientIG>[];
  private intervals: NodeJS.Timeout[] = [];

  private ig: ClientIG = new ClientIG();

  public constructor(config: ISessionConfig<ClientIG>) {
    this.config = config;
    this.tasks = config.tasks || [];
    this.ig.state.generateDevice(config.username);
    if (config.proxy) this.ig.state.proxyUrl = config.proxy;
  }

  public get client(): ClientIG {
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
