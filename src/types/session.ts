export interface IDPSession<ApiClient> {
  readonly client: ApiClient;
  start(): void;
  stop(): void;
}
