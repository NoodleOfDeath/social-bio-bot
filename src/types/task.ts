export interface ITask<Session> {
  generate: (session: Session) => Promise<void>;
  interval: number;
}
