// https://stackoverflow.com/questions/4059147/check-if-a-variable-is-a-string-in-javascript
const isString = value => {
	return typeof value === 'string' || value instanceof String;
};

export { isString };
