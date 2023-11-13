import pg from 'pg'
import { Sequelize, DataTypes } from 'sequelize'
import bcrypt from 'bcrypt'

const { Client } = pg

const Config = {
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	database: process.env.DB_NAME,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
}

const client = new Client(Config)

const sequelize = new Sequelize({
	...Config,
	username: process.env.DB_USER,
	dialect: 'postgres',
})

const User = sequelize.define('users', {
	username: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	full_name: DataTypes.STRING,
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	registration_date: {
		type: DataTypes.DATE,
		defaultValue: DataTypes.NOW,
	},
	role: {
		type: DataTypes.ENUM('admin', 'user', 'guest'),
		defaultValue: 'user',
	},
	profile_image_url: DataTypes.STRING,
	date_of_birth: DataTypes.DATE,
	gender: {
		type: DataTypes.ENUM('male', 'female', 'other'),
	},
	phone_number: DataTypes.STRING,
	notification_preferences: {
		type: DataTypes.BOOLEAN,
		defaultValue: true,
	},
	account_status: {
		type: DataTypes.ENUM('active', 'blocked', 'disabled'),
		defaultValue: 'active',
	},
})


async function connectToDatabase() {
	try {
		await client.connect()
		console.log('Conexión exitosa a PostgreSQL')

		await sequelize.sync()
		console.log('Modelo sincronizado con la base de datos')
	} catch (error) {
		console.error('Error al conectar a PostgreSQL:', error)
	}
}

connectToDatabase()

export class UsersModel {
	static async hashPassword(password) {
		const saltRounds = 10
		const salt = await bcrypt.genSalt(saltRounds)
		const hashedPassword = await bcrypt.hash(password, salt)
		return hashedPassword
	}

	static async createUser(userData) {
		userData.password = await UsersModel.hashPassword(userData.password)
		try {
			const user = await User.create(userData)
			return user
		} catch (error) {
			throw new Error('No se pudo crear el usuario: ' + error.message)
		}
	}

	static async getUserById(userId) {
		try {
			const user = await User.findByPk(userId)
			return user
		} catch (error) {
			throw new Error('No se pudo encontrar el usuario: ' + error.message)
		}
	}

	static async deleteUser(userId) {
		try {
			const user = await UsersModel.getUserById(userId)

			if (!user) {
				throw new Error('Usuario no encontrado')
			}

			await user.destroy()
		} catch (error) {
			throw new Error('No se pudo eliminar el usuario: ' + error.message)
		}
	}

	static async updateUser(userId, userData) {
		try {
			const user = await UsersModel.getUserById(userId)

			if (!user) {
				throw new Error('Usuario no encontrado')
			}

			const updatedUser = await user.update(userData)
			return updatedUser
		} catch (error) {
			throw new Error('No se pudo actualizar el usuario: ' + error.message)
		}
	}
}