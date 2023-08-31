export const toCapitalCase = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

/**
 * CLI exit codes.
 *
 * @see https://nodejs.org/api/process.html#process_exit_codes
 */
export function errorHandler(error: Error) {
	console.error(error.message);
	return process.exit(9);
}
