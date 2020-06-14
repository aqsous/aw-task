import Hapi from '@hapi/hapi';
import { IPlugin } from "./plugins/interfaces";
import { IServerConfigurations } from './configurations';
import { IDatabase } from "./database";
import Routes from './api/v1/routes';

export async function init(
  configs: IServerConfigurations,
  database: IDatabase
): Promise<Hapi.Server> {
  try {
    const port = process.env.PORT || configs.port;
    const server = new Hapi.Server({
      debug: { request: ['error'] },
      port: port,
      routes: {
        cors: {
          origin: ["*"]
        }
      }
    });

    //  Setup Hapi Plugins
    const pluginOptions = {
      database: database,
      serverConfigs: configs
    };

    console.log("All plugins registered successfully.");

    // const plugin: IPlugin = require('./plugins/swagger').default();
    //
    // await plugin.register(server, pluginOptions);

    console.log("Register Routes");
    Routes(server, configs, database);
    console.log("Routes registered sucessfully.");

    return server;
  } catch (err) {
    console.log("Error starting server: ", err);
    throw err;
  }
}
