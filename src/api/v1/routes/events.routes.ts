import Hapi from '@hapi/hapi';
import EventController from '../controllers/event.controller';
import * as EventValidator from '../validations/event.validation';
import { IDatabase } from '../../../database';
import { IServerConfigurations } from '../../../configurations';

export default function (server: Hapi.Server, serverConfigs: IServerConfigurations, database: IDatabase) {
	const eventController = new EventController(serverConfigs, database);
	server.bind(eventController);

	server.route({
		method: 'POST',
		path: '/events',
		options: {
			handler: eventController.createEvent,
			auth: false,
			tags: ['api', 'events'],
			description: 'Create a event.',
			validate: {
				payload: EventValidator.createEvent,
			},
			plugins: {
				'hapi-swagger': {
					responses: {
						'201': {
							description: 'Event created.',
						},
					},
				},
			},
		},
	});

	server.route({
		method: 'GET',
		path: '/events',
		options: {
			handler: eventController.listEvents,
			auth: false,
			tags: ['api', 'events'],
			description: 'List events.',
			validate: {
				query: EventValidator.listEvents
			},
			plugins: {
				'hapi-swagger': {
					responses: {
						'200': {
							description: 'Events listed.',
						},
					},
				},
			},
		},
	});
}
