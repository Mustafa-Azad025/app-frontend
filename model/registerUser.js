import { Schema, model, models } from "mongoose";

const userSchema = new Schema(
	{
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
		image: {
			type: String,
			default:
				"https://pluspng.com/img-png/user-png-icon-young-user-icon-2400.png",
		},
	},
	{ timestamps: true }
);

const Users = models.user || model("user", userSchema);

export default Users;
