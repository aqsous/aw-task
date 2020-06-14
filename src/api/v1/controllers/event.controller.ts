import Hapi from "@hapi/hapi";
import Boom from "@hapi/boom";
import Bull from 'bull';
import { IEvent } from "../models/event.model";
import { IDatabase } from "../../../database";
import { IServerConfigurations } from "../../../configurations";
import { IRequest } from "../../../interfaces/request";

// Create / Connect to a named work queue
const workQueue = new Bull('work', process.env.REDIS_URL || 'redis://h:p723faf536690b7df18ab1e00e25c1680d42c1abcbcb5c7d76e25a01c965a8e53@ec2-34-241-135-28.eu-west-1.compute.amazonaws.com:9679');

export default class EventController {
  private database: IDatabase;
  private configs: IServerConfigurations;

  constructor(configs: IServerConfigurations, database: IDatabase) {
    this.database = database;
    this.configs = configs;
  }

  public async createEvent(request: IRequest, h: Hapi.ResponseToolkit) {
    try {
      const job = await workQueue.add({
        task: 'ADD_EVENT',
        data: {
          ...(request.payload as object),
          date: new Date(),
        }
      })
      return h.response(job).code(201);
    } catch (error) {
      return Boom.badImplementation(error);
    }
  }


  public async listEvents(request: IRequest, h: Hapi.ResponseToolkit) {
    try {
      let events: Array<any> = await this.database.eventModel.find({ isDeleted: false });
      return events;
    } catch (error) {
      return Boom.badImplementation(error);
    }
  }

}
