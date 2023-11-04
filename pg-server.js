import { createApp } from "./app.js"

import { UsersModel } from "./models/pg/users.js"

createApp({ usersModel: UsersModel })