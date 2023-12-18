import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {MyLogger} from "./config/logger";
import {Logger} from "@nestjs/common";
import * as compression from 'compression'
import helmet from "helmet";
import * as bodyParser from 'body-parser'
import rateLimit from "express-rate-limit";
import {PORT, PRIMARY_COLOR, RATE_LIMIT_MAX} from "./config/environments";
const chalk = require('chalk');

async function bootstrap() {
	try {
		const app = await NestFactory.create(AppModule, {
			logger: new MyLogger()
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
