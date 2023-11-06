import { Router } from 'express'
import { UsersController } from '../controllers/users.js'

export const usersRouter = ({ usersModel }) => {
	const usersRouter = Router()

	const usersController = new UsersController({ usersModel })

	usersRouter.post('/', usersController.create)
	usersRouter.delete('/:userId', usersController.delete)
	usersRouter.put('/:userId', usersController.update)

	return usersRouter
}
