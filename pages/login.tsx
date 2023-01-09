import Image from "next/image";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useFormik } from "formik";
import loginvalid, { registerValidate } from "../lib/validate";
import { useRouter } from "next/router";

interface Values {
	name: string;
	email: string;
	password: string;
	password_confirmation: string;
	url: string;
}

export default function login() {
	const [popup, setPopup] = useState(false);
	const [show, setShow]: any = useState(false);
	const [passshow, setPassshow]: any = useState(false);
	const router = useRouter();
	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validate: loginvalid,
		onSubmit: async (values) => {
			const status: any = await signIn("credentials", {
				redirect: false,
				email: values.email,
				password: values.password,
				callbackUrl: "/",
			});
			if (status?.ok) {
				router.push(status.url);
			}
		},
	});
	const regformik = useFormik({
		initialValues: {
			fullname: "",
			email: "",
			password: "",
			password_confirmation: "",
		},
		validate: registerValidate,
		onSubmit: async (values) => {
			const option = {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(values),
			};
			await fetch("http://localhost:3000/api/auth/signup", option)
				.then((res) => res.json())
				.then((data) => router.push("http://localhost:3000/"));

			setPopup(!popup);
		},
	});
	const handleGoogleAuth = async () => {
		signIn("google", {
			callbackUrl: "http://localhost:3000/",
		});
	};
	const handleGithubAuth = async () => {
		signIn("github", {
			callbackUrl: "http://localhost:3000/",
		});
	};

	return (
		<>
			<div className="overflow-hidden w-[100vw] h-[100vh]">
				<div className="bg-[#EFEFEF] w-full h-full grid lg:grid-cols-2 ">
					<div className="m-auto">
						<Image
							src="/brand.png"
							width={350}
							height={120}
							alt="facebook icon"
						/>
						<p className="max-w-[37rem] text-xl h-16 ml-10 md:text-3xl">
							Facebook helps you connect and share with the people in your life.
						</p>
					</div>
					<div className="my-auto py-2">
						<form
							onSubmit={formik.handleSubmit}
							className="md:w-2/3 bg-white m-auto space-y-4 rounded-lg p-8 shadow-xl"
						>
							<div>
								<div className="relative mt-1 flex">
									<input
										type="email"
										id="email"
										{...formik.getFieldProps("email")}
										className="w-full rounded-lg placeholder:text-gray-600 p-4 pr-12 text-sm shadow-sm"
										placeholder="Enter email or Phone Number"
										autoComplete="off"
									/>
									{formik.errors.email && formik.touched.email ? (
										<div className="absolute w-2 h-2 right-4 top-4">
											<svg
												width="20"
												height="20"
												viewBox="0 0 32 32"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
												onClick={() => setShow(!show)}
											>
												<g clip-path="url(#clip0_137_2)">
													<path
														d="M16 0C7.16429 0 0 7.16429 0 16C0 24.8357 7.16429 32 16 32C24.8357 32 32 24.8357 32 16C32 7.16429 24.8357 0 16 0ZM17.1429 23.7143C17.1429 23.8714 17.0143 24 16.8571 24H15.1429C14.9857 24 14.8571 23.8714 14.8571 23.7143V14C14.8571 13.8429 14.9857 13.7143 15.1429 13.7143H16.8571C17.0143 13.7143 17.1429 13.8429 17.1429 14V23.7143ZM16 11.4286C15.5514 11.4194 15.1243 11.2348 14.8102 10.9143C14.4962 10.5938 14.3204 10.163 14.3204 9.71429C14.3204 9.2656 14.4962 8.83478 14.8102 8.51429C15.1243 8.19379 15.5514 8.00916 16 8C16.4486 8.00916 16.8757 8.19379 17.1898 8.51429C17.5038 8.83478 17.6796 9.2656 17.6796 9.71429C17.6796 10.163 17.5038 10.5938 17.1898 10.9143C16.8757 11.2348 16.4486 11.4194 16 11.4286Z"
														fill="#D14848"
													/>
												</g>
												<defs>
													<clipPath id="clip0_137_2">
														<rect width="32" height="32" fill="white" />
													</clipPath>
												</defs>
											</svg>
										</div>
									) : (
										<></>
									)}
									{show && (
										<div
											role="alert"
											className="rounded border-l-4 border-red-500 bg-red-50 p-1 absolute w-28 -right-32 top-2 "
										>
											<strong className="block font-medium text-xs text-red-700">
												{" "}
												Email-Id is not correct{" "}
											</strong>
										</div>
									)}
								</div>
							</div>

							<div>
								<div className="relative mt-1 flex">
									<input
										type="password"
										id="password"
										{...formik.getFieldProps("password")}
										className="w-full rounded-lg placeholder:text-gray-600 border-[#0184C7]/75 p-4 pr-12 text-sm shadow-sm"
										placeholder="Enter password"
									/>
									{formik.errors.password && formik.touched.password ? (
										<div className="absolute w-2 h-2 right-4 top-4">
											<svg
												width="20"
												height="20"
												viewBox="0 0 32 32"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
												onClick={() => setPassshow(!passshow)}
											>
												<g clip-path="url(#clip0_137_2)">
													<path
														d="M16 0C7.16429 0 0 7.16429 0 16C0 24.8357 7.16429 32 16 32C24.8357 32 32 24.8357 32 16C32 7.16429 24.8357 0 16 0ZM17.1429 23.7143C17.1429 23.8714 17.0143 24 16.8571 24H15.1429C14.9857 24 14.8571 23.8714 14.8571 23.7143V14C14.8571 13.8429 14.9857 13.7143 15.1429 13.7143H16.8571C17.0143 13.7143 17.1429 13.8429 17.1429 14V23.7143ZM16 11.4286C15.5514 11.4194 15.1243 11.2348 14.8102 10.9143C14.4962 10.5938 14.3204 10.163 14.3204 9.71429C14.3204 9.2656 14.4962 8.83478 14.8102 8.51429C15.1243 8.19379 15.5514 8.00916 16 8C16.4486 8.00916 16.8757 8.19379 17.1898 8.51429C17.5038 8.83478 17.6796 9.2656 17.6796 9.71429C17.6796 10.163 17.5038 10.5938 17.1898 10.9143C16.8757 11.2348 16.4486 11.4194 16 11.4286Z"
														fill="#D14848"
													/>
												</g>
												<defs>
													<clipPath id="clip0_137_2">
														<rect width="32" height="32" fill="white" />
													</clipPath>
												</defs>
											</svg>
										</div>
									) : (
										<></>
									)}
									{passshow && (
										<div
											role="alert"
											className="rounded border-l-4 border-red-500 bg-red-50 p-1 absolute w-28 -right-32 top-2 "
										>
											<strong className="block font-medium text-xs text-red-700">
												{" "}
												Incorrect Password Format{" "}
											</strong>
										</div>
									)}
								</div>
							</div>

							<button
								type="submit"
								className="block w-full rounded-lg bg-[#149FFF] px-5 py-3 text-lg font-semibold text-white"
							>
								Log in
							</button>

							<p className="text-center w-full text-sm text-gray-500">
								Don't have an acoount?
								<button
									className="font-semibold ml-16 text-[#149FFF]"
									type="button"
									onClick={() => setPopup(!popup)}
								>
									Register
								</button>
							</p>
							<button
								type="button"
								onClick={handleGoogleAuth}
								className="block w-full rounded-lg px-5 py-3 text-lg border-black border-2 font-semibold text-black"
							>
								Sign in With Google
							</button>
							<button
								type="button"
								onClick={handleGithubAuth}
								className="block w-full rounded-lg px-5 py-3 text-lg border-black border-2 font-semibold text-black"
							>
								Sign in With Github
							</button>
						</form>
					</div>
				</div>

				{/* registration */}

				{popup && (
					<div className="absolute w-full h-full overflow-hidden top-0 backdrop-blur-lg z-5">
						<button
							type="button"
							className="absolute top-[3rem] right-10 w-fit h-fit "
							onClick={() => setPopup(!popup)}
						>
							<svg
								width="20"
								height="20"
								viewBox="0 0 30 30"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M29.2226 25.5374C30.2591 26.5739 30.2591 28.1862 29.2226 29.2226C28.7044 29.7409 28.071 29.9712 27.38 29.9712C26.6891 29.9712 26.0557 29.7409 25.5374 29.2226L15 18.6852L4.46257 29.2226C3.94434 29.7409 3.31094 29.9712 2.61996 29.9712C1.92898 29.9712 1.29559 29.7409 0.777351 29.2226C-0.259117 28.1862 -0.259117 26.5739 0.777351 25.5374L11.3148 15L0.777351 4.46257C-0.259117 3.4261 -0.259117 1.81382 0.777351 0.777351C1.81382 -0.259117 3.4261 -0.259117 4.46257 0.777351L15 11.3148L25.5374 0.777351C26.5739 -0.259117 28.1862 -0.259117 29.2226 0.777351C30.2591 1.81382 30.2591 3.4261 29.2226 4.46257L18.6852 15L29.2226 25.5374Z"
									fill="black"
								/>
							</svg>
						</button>
						<form
							onSubmit={regformik.handleSubmit}
							className="w-fit sm:h-fit shadow-2xl mx-auto my-40 rounded-xl bg-white m-auto p-4 xl:p-3 grid grid-cols-6 gap-6"
						>
							<div className="col-span-6">
								<label
									htmlFor="Name"
									className="block text-sm font-medium text-gray-700"
								>
									Name
								</label>

								<input
									type="text"
									id="Name"
									{...regformik.getFieldProps("fullname")}
									className=" w-full p-[0.6rem] mt-2 rounded-md border-2 border-gray-400 bg-white text-sm text-gray-700 shadow-sm"
								/>
								{regformik.errors.fullname && regformik.touched.fullname ? (
									<span className="font-medium text-sm text-red-700 ml-5">
										Invalid User Name
									</span>
								) : (
									<></>
								)}
							</div>

							<div className="col-span-6">
								<label
									htmlFor="Email"
									className="block text-sm font-medium text-gray-700"
								>
									Email
								</label>

								<input
									type="email"
									id="Email"
									{...regformik.getFieldProps("email")}
									className="p-[0.6rem] mt-2 w-full rounded-md border-2 border-gray-400 bg-white text-sm text-gray-700 shadow-sm"
								/>
								{regformik.errors.email && regformik.touched.email ? (
									<span className="font-medium text-sm text-red-700 ml-5">
										Invalid Email Address
									</span>
								) : (
									<></>
								)}
							</div>

							<div className="col-span-6 sm:col-span-3">
								<label
									htmlFor="Password"
									className="block text-sm font-medium text-gray-700"
								>
									Password
								</label>

								<input
									type="password"
									id="Password"
									{...regformik.getFieldProps("password")}
									className="p-[0.6rem] mt-2 w-full rounded-md border-2 border-gray-400 bg-white text-sm text-gray-700 shadow-sm"
								/>
								{regformik.errors.password && regformik.touched.password ? (
									<div className="absolute xl:hidden mt-0 top-[53.5%] right-[70.5%] md:top-[59%] md:right-[53.5%]  w-2 h-2 ">
										<svg
											width="18"
											height="18"
											viewBox="0 0 32 32"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
											onClick={() => setPassshow(!passshow)}
										>
											<g clip-path="url(#clip0_137_2)">
												<path
													d="M16 0C7.16429 0 0 7.16429 0 16C0 24.8357 7.16429 32 16 32C24.8357 32 32 24.8357 32 16C32 7.16429 24.8357 0 16 0ZM17.1429 23.7143C17.1429 23.8714 17.0143 24 16.8571 24H15.1429C14.9857 24 14.8571 23.8714 14.8571 23.7143V14C14.8571 13.8429 14.9857 13.7143 15.1429 13.7143H16.8571C17.0143 13.7143 17.1429 13.8429 17.1429 14V23.7143ZM16 11.4286C15.5514 11.4194 15.1243 11.2348 14.8102 10.9143C14.4962 10.5938 14.3204 10.163 14.3204 9.71429C14.3204 9.2656 14.4962 8.83478 14.8102 8.51429C15.1243 8.19379 15.5514 8.00916 16 8C16.4486 8.00916 16.8757 8.19379 17.1898 8.51429C17.5038 8.83478 17.6796 9.2656 17.6796 9.71429C17.6796 10.163 17.5038 10.5938 17.1898 10.9143C16.8757 11.2348 16.4486 11.4194 16 11.4286Z"
													fill="#D14848"
												/>
											</g>
											<defs>
												<clipPath id="clip0_137_2">
													<rect width="32" height="32" fill="white" />
												</clipPath>
											</defs>
										</svg>
									</div>
								) : (
									<></>
								)}
								{passshow && (
									<div
										role="alert"
										className="rounded border-l-4 w-40  border-red-500 bg-red-50 p-1 relative md:-right-60 md:top-[-2.1rem] top-[-4.6rem] right-[-7rem] ml-[4%]"
									>
										<strong className="block font-medium text-xs text-red-700">
											{" "}
											Incorrect Password Format{" "}
										</strong>
									</div>
								)}
								{regformik.errors.password && regformik.touched.password ? (
									<div
										role="alert"
										className="rounded hidden xl:block border-l-4 w-40  border-red-500 bg-red-50 p-1 relative md:-right-60 md:top-[-2.1rem] top-[-4.6rem] right-[-7rem] ml-[4%]"
									>
										<strong className="block font-medium text-xs text-red-700">
											{" "}
											Incorrect Password Format{" "}
										</strong>
									</div>
								) : (
									<></>
								)}
							</div>

							<div className="col-span-6 sm:col-span-3">
								<label
									htmlFor="PasswordConfirmation"
									className="block text-sm font-medium text-gray-700"
								>
									Password Confirmation
								</label>

								<input
									type="password"
									id="PasswordConfirmation"
									{...regformik.getFieldProps("password_confirmation")}
									className="p-[0.6rem] mt-2 w-full rounded-md border-2 border-gray-400 bg-white text-sm text-gray-700 shadow-sm"
								/>
								{regformik.errors.password_confirmation &&
								regformik.touched.password_confirmation ? (
									<div className="absolute xl:hidden mt-0 top-[53.5%] right-[70.5%] md:top-[59%] md:right-[53.5%]  w-2 h-2 ">
										<svg
											width="18"
											height="18"
											viewBox="0 0 32 32"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
											onClick={() => setShow(!show)}
										>
											<g clip-path="url(#clip0_137_2)">
												<path
													d="M16 0C7.16429 0 0 7.16429 0 16C0 24.8357 7.16429 32 16 32C24.8357 32 32 24.8357 32 16C32 7.16429 24.8357 0 16 0ZM17.1429 23.7143C17.1429 23.8714 17.0143 24 16.8571 24H15.1429C14.9857 24 14.8571 23.8714 14.8571 23.7143V14C14.8571 13.8429 14.9857 13.7143 15.1429 13.7143H16.8571C17.0143 13.7143 17.1429 13.8429 17.1429 14V23.7143ZM16 11.4286C15.5514 11.4194 15.1243 11.2348 14.8102 10.9143C14.4962 10.5938 14.3204 10.163 14.3204 9.71429C14.3204 9.2656 14.4962 8.83478 14.8102 8.51429C15.1243 8.19379 15.5514 8.00916 16 8C16.4486 8.00916 16.8757 8.19379 17.1898 8.51429C17.5038 8.83478 17.6796 9.2656 17.6796 9.71429C17.6796 10.163 17.5038 10.5938 17.1898 10.9143C16.8757 11.2348 16.4486 11.4194 16 11.4286Z"
													fill="#D14848"
												/>
											</g>
											<defs>
												<clipPath id="clip0_137_2">
													<rect width="32" height="32" fill="white" />
												</clipPath>
											</defs>
										</svg>
									</div>
								) : (
									<></>
								)}
								{show && (
									<div
										role="alert"
										className="rounded border-l-4 w-40  border-red-500 bg-red-50 p-1 relative md:-right-60 md:top-[-2.1rem] top-[-4.6rem] right-[-7rem] ml-[4%]"
									>
										<strong className="block font-medium text-xs text-red-700">
											{" "}
											Incorrect Password Format{" "}
										</strong>
									</div>
								)}
								{regformik.errors.password_confirmation &&
								regformik.touched.password_confirmation ? (
									<div
										role="alert"
										className="rounded hidden xl:block border-l-4 w-40  border-red-500 bg-red-50 p-1 relative md:-right-60 md:top-[-2.1rem] top-[-4.6rem] right-[-7rem] ml-[4%]"
									>
										<strong className="block font-medium text-xs text-red-700">
											{" "}
											Incorrect Password Format{" "}
										</strong>
									</div>
								) : (
									<></>
								)}
							</div>

							<div className="col-span-6">
								<p className="text-sm text-gray-500">
									By creating an account, you agree to our
									<a href="#" className="text-[#149FFF] underline">
										terms and conditions
									</a>
									and
									<a href="#" className="text-[#149FFF] underline">
										privacy policy
									</a>
									.
								</p>
							</div>

							<div className="col-span-6 sm:flex sm:items-center sm:gap-4">
								<button className="inline-block shrink-0 rounded-md border border-[#149FFF] bg-[#149FFF] px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-[#149FFF] focus:outline-none focus:ring active:text-[#149FFF]/80">
									Create an account
								</button>

								<p className="mt-4 text-sm text-gray-500 sm:mt-0">
									Already have an account?
									<a href="#" className="text-[#149FFF] underline">
										Log in
									</a>
									.
								</p>
							</div>
						</form>
					</div>
				)}
			</div>
		</>
	);
}
