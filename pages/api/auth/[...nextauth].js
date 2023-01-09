import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "./../../../database/connect";
import Users from "./../../../model/registerUser";
import { compare } from "bcryptjs";

export const authOptions = {
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
		CredentialsProvider({
			name: "Credentials",
			async authorize(credential, req) {
				connectDB().catch((error) => {
					error: {
						("Connection Failed ...");
					}
				});

				const result = await Users.findOne({ email: credential.email });
				if (!result) {
					throw new Error("No User Found in Database");
				}

				const checkpass = await compare(credential.password, result.password);

				if (!checkpass || result.email !== credential.email) {
					throw new Error("Invalid Details");
				}

				return result;
			},
		}),
	],
	secret: "HgushgiuHIOHS%456432HGl112h",
};
export default NextAuth(authOptions);
