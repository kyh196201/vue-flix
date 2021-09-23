// https://stackoverflow.com/questions/4059147/check-if-a-variable-is-a-string-in-javascript
const isString = value => {
	return typeof value === 'string' || value instanceof String;
};

/**
 * https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
 * 이메일 validation 체크
 * @param {string} email
 * @returns {boolean}
 */
const isValidEmail = email => {
	const re =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
};

export { isString, isValidEmail };
