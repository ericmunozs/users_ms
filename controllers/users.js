export class UsersController {
	constructor({ usersModel }) {
		this.usersModel = usersModel
	}

	create = async (req, res) => {
		try {
			const { username, password, full_name, email, role, profile_image_url, date_of_birth, gender, phone_number } = req.body

			const newUser = await this.usersModel.createUser({
				username,
				password,
				full_name,
				email,
				role,
				profile_image_url,
				date_of_birth,
				gender,
				phone_number,
			})

			res.status(201).json(newUser)
		} catch (error) {
			console.error('Error al procesar la solicitud:', error)
			res.status(500).json({ message: 'Error interno del servidor', error: error.message })
		}
	}

	delete = async (req, res) => {
		try {
			const { userId } = req.params

			await this.usersModel.deleteUser(userId)

			res.status(204).send()
		} catch (error) {
			console.error('Error al procesar la solicitud:', error)
			res.status(500).json({ message: 'Error interno del servidor', error: error.message })
		}
	}
}
