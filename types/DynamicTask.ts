


export default class DynamicTask<ApiClient> {
  
  private generator: (client: ApiClient) => Promise<void>;
  public interval: number;
  
  public constructor(generator: (client: ApiClient) => Promise<void>, interval = 20000) {
    this.generator = generator;
    this.interval = interval;
  }
  
  public generate(client: ApiClient): Promise<void> {
    return this.generator(client);
  }
  
}
