import { ITask } from '.';

export interface IDPSessionConfig<Session> {
  username: string;
  password: string;
  proxy?: string;
  tasks?: ITask<Session>[];
}
