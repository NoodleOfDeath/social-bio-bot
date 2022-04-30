import { ISession } from './session';

export interface ITask<Client> {
  generate: (session: ISession<Client>) => Promise<void>;
  interval: number;
}
