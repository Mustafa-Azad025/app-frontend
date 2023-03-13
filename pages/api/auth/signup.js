import connectDB from "./../../../database/connect";
import Users from "../../../model/registerUser";
import { hash } from "bcryptjs";
export default async function handler(req, res) {
	connectDB().catch((error) => res.json({ error: "Connection Failed . . . " }));

	if (req.method === "POST") {
		if (!req.body) {
			return res.status(404).json({ error: "Don't Have Form Data" });
		}
		const { fullname, email, password, image } = req.body;

		// checking dublicate users
		const check = await Users.findOne({ email });
		if (check) return res.status(422).json({ message: "User Already Exists" });

		Users.create(
			{ fullname, email, password: await hash(password, 12), image },
			function (err, data) {
				if (err) return res.status(404).json({ err });
				res.status(201).json({ status: true, user: data });
			}
		);
	} else {
		res
			.status(500)
			.json({ message: "HTTP request is not valid only post accepted" });
	}
}
