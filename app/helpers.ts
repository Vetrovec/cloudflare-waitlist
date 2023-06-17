export function validateEmail(email: string) {
	const regex = /^[\w.-]+@[a-zA-Z_-]+?(?:\.[a-zA-Z]{2,6})+$/;
	return regex.test(email);
}
