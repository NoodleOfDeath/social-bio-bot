import { ITask } from '.';

export interface ICredentials {
  username: string;
  password: string;
}

export interface ISessionConfig<Client> extends ICredentials {
  proxy?: string;
  tasks?: ITask<Client>[];
}

export interface IHeadlessSession {
  start(): void;
  stop?(): void;
}

export interface ISession<Client> extends IHeadlessSession {
  readonly client: Client;
}
