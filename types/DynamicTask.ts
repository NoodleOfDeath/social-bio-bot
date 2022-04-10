
export default class DynamicTask {
  
  private generator: () => Promise<void>;
  public refresh_rate: number;
  
  public constructor(generator: () => Promise<void>, refresh_rate = 10000) {
    this.generator = generator;
    this.refresh_rate = refresh_rate;
  }
  
  public generate(): Promise<void> {
    return this.generator();
  }
  
}
