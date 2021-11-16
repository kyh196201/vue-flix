// TODO Error Constructor 체크해서 분기 처리하기
const handleError = function handleError(error) {
	const response = error.response;

	return {
		isError: true,
		errorData: {
			message: response?.data?.status_message || error.message,
			statusCode: response?.data?.status_code || null,
		},
	};
};

export { handleError };
