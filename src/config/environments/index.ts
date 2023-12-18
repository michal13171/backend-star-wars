import * as dotenv from 'dotenv'

dotenv.config()

const NODE_ENV: string = process.env.NODE_ENV || 'development'
const PRIMARY_COLOR: string = '#87e8de'
const PORT: number = 3000;
const RATE_LIMIT_MAX: number = 10000;

export {
	NODE_ENV,
	PRIMARY_COLOR,
	PORT,
	RATE_LIMIT_MAX
}