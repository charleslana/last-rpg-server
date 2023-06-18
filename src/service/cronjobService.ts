import { CronJob } from 'cron';

export default class CronJobService {
  public static start() {
    this.firstJob();
    this.secondJob();
  }

  private static firstJob() {
    new CronJob('0 */1 * * * *', async () => console.log('event 1')).start();
  }

  private static secondJob() {
    new CronJob('0 */2 * * * *', () => console.log('event 2')).start();
  }
}
