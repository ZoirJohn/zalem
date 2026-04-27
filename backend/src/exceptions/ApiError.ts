export class ApiError extends Error {
	statusCode: number;
	errors: string[];
	constructor(statusCode: number, message: string, errors: string[] = []) {
		super(message);
		this.statusCode = statusCode;
		this.errors = errors;
	}
	static UnauthorizedError() {
		return new ApiError(401, "Unauthorized");
	}
	static BadRequest(message = "Bad request", errors: string[] = []) {
		return new ApiError(400, message, errors);
	}
	static Conflict(message = "Conflict", errors: string[] = []) {
		return new ApiError(409, message, errors);
	}
	static NotFound(message = "Not found", errors: string[] = []) {
		return new ApiError(404, message, errors);
	}
}
