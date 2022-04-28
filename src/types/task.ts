import { IBBSession } from './session';

export interface IBBTask<Client> {
  generate: (session: IBBSession<Client>) => Promise<void>;
  interval: number;
}
