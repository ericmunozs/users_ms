import express from 'express'
import { corsMiddleware } from './middlewares/cors.js'
import { usersRouter } from './routes/users.js'
import 'dotenv/config'

export const createApp = ({ usersModel }) => {
	const app = express()
	app.use(express.json())
	app.use(corsMiddleware())
	app.disable('x-powered-by')

	app.use('/users', usersRouter({ usersModel }))

	const SERVER_PORT = process.env.SERVER_PORT

	app.listen(SERVER_PORT, () => {
		console.log(`server listening on port http://localhost:${SERVER_PORT}`)
	})
}
