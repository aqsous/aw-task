import Hapi from '@hapi/hapi';
import EventRoutes from './events.routes';
import { IDatabase } from '../../../database';
import { IServerConfigurations } from '../../../configurations';

export default function init(server: Hapi.Server, configs: IServerConfigurations, database: IDatabase) {
    EventRoutes(server, configs, database);
}
