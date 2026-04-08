export class ApiError extends Error {
	statusCode: number;
	errors: string[];
	constructor(statusCode: number, message: string, errors: string[] = []) {
		super(message);
		this.statusCode = statusCode;
		this.errors = errors;
	}
	static UnauthorizedError() {
		return new ApiError(401, "User not authorized");
	}
	static BadRequest() {
		return new ApiError(400, "Bad request");
	}
}