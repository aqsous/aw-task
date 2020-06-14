import throng from 'throng';
import Bull from 'bull';
import * as Configs from "./configurations";
import * as Database from "./database";
import {IEvent} from "./api/v1/models/event.model";

// Init Database
const dbConfigs = Configs.getDatabaseConfig();
const database: Database.IDatabase = Database.init(dbConfigs);

// Spin up multiple processes to handle jobs to take advantage of more CPU cores
// See: https://devcenter.heroku.com/articles/node-concurrency for more info
const workers = process.env.WEB_CONCURRENCY || 2;

// The maxium number of jobs each worker should process at once. This will need
// to be tuned for your application. If each job is mostly waiting on network
// responses it can be much higher. If each job is CPU-intensive, it might need
// to be much lower.
const maxJobsPerWorker = 1;

function start() {
  // Connect to the named work queue
  const workQueue = new Bull('work', process.env.REDIS_URL || 'redis://h:p723faf536690b7df18ab1e00e25c1680d42c1abcbcb5c7d76e25a01c965a8e53@ec2-34-241-135-28.eu-west-1.compute.amazonaws.com:9679');


  workQueue.process(maxJobsPerWorker, async (job) => {
    try {
      // This is an example job that just slowly reports on progress
      // while doing no work. Replace this with your own job logic.
      if (job.data != null && job.data.task === 'ADD_EVENT') {
        return await database.eventModel.create( job.data.data as IEvent);
      }
    } catch (error) {
      return { success: false, error };
    }
    job.progress(100);
    // A job can return values that will be stored in Redis as JSON
    // This return value is unused in this demo application.
    return { value: 'This will be stored' };
  });
}

// Initialize the clustered worker process
// See: https://devcenter.heroku.com/articles/node-concurrency for more info
throng({ workers, start });
