import { IPlugin } from "../interfaces";
import Hapi from '@hapi/hapi';
import * as Inert from '@hapi/inert';
import * as Vision from '@hapi/vision';
import HapiSwagger from 'hapi-swagger';


const register = async (server: Hapi.Server): Promise<void> => {
  try {
    const swaggerOptions: HapiSwagger.RegisterOptions = {
      info: {
        title: " Api",
        description: "Api Documentation",
        version: "0.0.1"
      },
      tags: [
        {
          name: "events",
          description: "Api events interface."
        }
      ],
      swaggerUI: false,
      documentationPage: true,
      documentationPath: "/"
    };
    const plugins: Array<Hapi.ServerRegisterPluginObject<any>> = [
      {
        plugin: Inert
      },
      {
        plugin: Vision
      },
      {
        plugin: HapiSwagger,
        options: swaggerOptions
      }
    ]
    return server.register(plugins);
  } catch (err) {
    console.log(`Error registering swagger plugin: ${err}`);
  }
};

export default (): IPlugin => {
  return {
    register,
    info: () => {
      return { name: "Swagger Documentation", version: "1.0.0" };
    }
  };
};
