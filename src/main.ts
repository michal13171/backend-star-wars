import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {MyLogger} from "./config/logger";
import {Logger} from "@nestjs/common";
import * as compression from 'compression'
import helmet from "helmet";
import * as bodyParser from 'body-parser'
import rateLimit from "express-rate-limit";
import {PORT, PRIMARY_COLOR, RATE_LIMIT_MAX} from "@environments";
import {FilmSeeder, PeopleSeeder, PlanetSeeder, SpeciesSeeder, StarshipSeeder, VehicleSeeder} from "@seeders";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

const chalk = require('chalk');

async function bootstrap() {
	try {
		const app = await NestFactory.create(AppModule, {
			logger: new MyLogger(),
		});
		
		// NOTE: adapter for e2e testing
		app.getHttpAdapter()
		
		// NOTE: compression
		app.use(compression())
		
		// NOTE: added security
		app.use(helmet())
		
		// NOTE: body parser
		app.use(bodyParser.json({limit: '50mb'}))
		app.use(
			bodyParser.urlencoded({
				limit: '50mb',
				extended: true,
				parameterLimit: 50000
			})
		)
		
		// NOTE: rateLimit
		app.use(
			rateLimit({
				windowMs: 1000 * 60 * 60, // an hour
				max: RATE_LIMIT_MAX, // limit each IP to 100 requests per windowMs
				message:
					'⚠️  Too many request created from this IP, please try again after an hour'
			})
		)
		
		const config = new DocumentBuilder()
			.setTitle('Star wars API')
			.setDescription('The star wars API description')
			.setVersion('1.0')
			.addTag('Star wars')
			.build();
		const document = SwaggerModule.createDocument(app, config);
		SwaggerModule.setup('api', app, document);
		
		let peopleSeeder = app.get(PeopleSeeder);
		let filmSeeder = app.get(FilmSeeder);
		let vehicleSeeder = app.get(VehicleSeeder);
		let starshipSeeder = app.get(StarshipSeeder);
		let speciesSeeder = app.get(SpeciesSeeder);
		let planetSeeder = app.get(PlanetSeeder);
		
		peopleSeeder
			.seed()
			.then(responseCompleteSeeders)
			.catch(error => responseErrorSeeders(error));

		filmSeeder
			.seed()
			.then(responseCompleteSeeders)
			.catch(error => responseErrorSeeders(error));
		
		vehicleSeeder
			.seed()
			.then(responseCompleteSeeders)
			.catch(error => responseErrorSeeders(error));
		
		starshipSeeder
			.seed()
			.then(responseCompleteSeeders)
			.catch(error => responseErrorSeeders(error));
		
		speciesSeeder
			.seed()
			.then(responseCompleteSeeders)
			.catch(error => responseErrorSeeders(error));
		
		planetSeeder
			.seed()
			.then(responseCompleteSeeders)
			.catch(error => responseErrorSeeders(error));
		
		await app.listen(PORT);
		
		Logger.log(
			`🚀  Server is listening on port ${chalk
				.hex(PRIMARY_COLOR)
				.bold(PORT.toString())}`,
			'Bootstrap'
		)
		
	} catch (e) {
		Logger.error(`❌  Error starting server, ${e}`, '', 'Bootstrap')
		process.exit()
	}
}

bootstrap().catch(e => {
	Logger.error(`❌  Error starting server, ${e}`, '', 'Bootstrap')
	throw e
});

let responseCompleteSeeders = () => {
	Logger.debug('Seeding complete!');
}
let responseErrorSeeders = (error) => {
	Logger.error('Seeding failed!');
	throw error;
}
