import Hapi from "@hapi/hapi";
import Boom from "@hapi/boom";
import { IEvent } from "../models/event.model";
import { IDatabase } from "../../../database";
import { IServerConfigurations } from "../../../configurations";
import { IRequest } from "../../../interfaces/request";

export default class EventController {
  private database: IDatabase;
  private configs: IServerConfigurations;

  constructor(configs: IServerConfigurations, database: IDatabase) {
    this.database = database;
    this.configs = configs;
  }

  public async createEvent(request: IRequest, h: Hapi.ResponseToolkit) {
    try {
      let event: any = await this.database.eventModel.create(request.payload as IEvent);
      return h.response(event).code(201);
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
