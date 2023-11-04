import { Router } from 'express'
import { UsersController } from '../controllers/users.js'

export const createUsersRouter = ({ usersModel }) => {
	const usersRouter = Router()

	const usersController = new UsersController({ usersModel })

	usersRouter.post('/', usersController.create)

	return usersRouter
}
