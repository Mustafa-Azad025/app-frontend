import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
	fullname: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
});

const Users = models.user || model("user", userSchema);

export default Users;
