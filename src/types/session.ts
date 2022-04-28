import { IBBTask } from '.';

export interface IBBHeadlessSession {
  start(): void;
  stop(): void;
}

export interface IBBSession<Client> extends IBBHeadlessSession {
  readonly client: Client;
}

export interface IBBCredentials {
  username: string;
  password: string;
}

export interface IBBSessionConfig<Client> extends IBBCredentials {
  proxy?: string;
  tasks?: IBBTask<Client>[];
}
