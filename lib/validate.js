export default function loginvalid(values) {
	let error = {};

	if (!values.email) {
		error.email = "Required";
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
		error.email = "Invalid Details";
	}

	if (values === "admin") {
		error = "Nice try!";
	}

	if (!values.password) {
		error.password = "Required";
	} else if (values.password.length < 8) {
		error.password = "Must be greater than 8 and less than 20";
	} else if (values.password.includes(" ")) {
		error.password = "Invalid Details";
	}
	return error;
}

export function registerValidate(values) {
	const error = {};

	if (!values.fullname) {
		error.fullname = "Required";
	} else if (values.fullname.includes(" ")) {
		error.fullname = "Invalid Name";
	}

	if (!values.email) {
		error.email = "Required";
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
		error.email = "Invalid Details";
	}

	if (!values.password) {
		error.password = "Required";
	} else if (values.password.length < 8) {
		error.password = "Must be greater than 8 and less than 20";
	} else if (values.password.includes(" ")) {
		error.password = "Invalid Details";
	}

	if (!values.password_confirmation) {
		error.password_confirmation = "Required";
	} else if (values.password !== values.password_confirmation) {
		error.password_confirmation = "Password Doesn't Match";
	} else if (values.password_confirmation.includes(" ")) {
		error.password_confirmation = "Invalid Details";
	}

	return error;
}
