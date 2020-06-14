import * as Server from "./server";
import * as Database from "./database";
import * as Configs from "./configurations";

// Catch unhandling unexpected exceptions
process.on("uncaughtException", (error: Error) => {
  console.error(`uncaughtException ${error.message}`);
});

// Catch unhandling rejected promises
process.on("unhandledRejection", (reason: any) => {
  console.error(`unhandledRejection ${reason}`);
});

// Define async start function
const start = async (config: Configs.IServerConfigurations, db: Database.IDatabase) => {
  try {
    const server = await Server.init(config, db);
    await server.start();
    console.log("Server running at:", server.info.uri);
  } catch (err) {
    console.error("Error starting server: ", err.message);
    throw err;
  }
};

// Init Database
const dbConfigs = Configs.getDatabaseConfig();
const database: Database.IDatabase = Database.init(dbConfigs);

// Starting Application Server
const serverConfigs: Configs.IServerConfigurations = Configs.getServerConfigs();

// Start the server
start(serverConfigs, database);
