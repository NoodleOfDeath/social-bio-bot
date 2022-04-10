


export default class DynamicTask<ApiClient> {
  
  private generator: (client: ApiClient) => Promise<void>;
  public refresh_rate: number;
  
  public constructor(generator: (client: ApiClient) => Promise<void>, refresh_rate = 10000) {
    this.generator = generator;
    this.refresh_rate = refresh_rate;
  }
  
  public generate(client: ApiClient): Promise<void> {
    return this.generator(client);
  }
  
}
