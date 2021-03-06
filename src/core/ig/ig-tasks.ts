import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import { IgApiClient } from 'instagram-private-api';
import { ISession, ITask } from '../../types';

export class IIgCycleProfilePictureTask implements ITask<IgApiClient> {
  public generate: (session: ISession<IgApiClient>) => Promise<void>;
  public interval: number;

  private index: number = -1;

  public constructor(dir: string, interval: number, generate?: (session: ISession<IgApiClient>) => Promise<void>) {
    this.generate =
      generate ||
      ((session: ISession<IgApiClient>): Promise<void> => {
        const images = readdirSync(dir);
        return new Promise<void>((resolve, reject) => {
          if (images.length < 1) reject(new Error(`No images were found in ${dir}`));
          let n = Math.floor(Math.random() * images.length);
          while (n === this.index) n = Math.floor(Math.random() * images.length);
          this.index = n;
          const imgPath = join(dir, images[this.index]);
          const buffer = readFileSync(imgPath);
          session.client.account
            .changeProfilePicture(buffer)
            .then(() => {
              resolve();
            })
            .catch((error: Error) => reject(error));
        });
      });
    this.interval = interval;
  }
}

export class IIgCycleBioTask implements ITask<IgApiClient> {
  public generate: (session: ISession<IgApiClient>) => Promise<void>;
  public interval: number;

  public constructor(bioGenerator: () => string, interval: number) {
    this.generate = (session: ISession<IgApiClient>): Promise<void> => {
      return new Promise<void>((resolve, reject) => {
        session.client.account
          .setBiography(bioGenerator())
          .then(() => {
            resolve();
          })
          .catch((error: Error) => reject(error));
      });
    };
    this.interval = interval;
  }
}
