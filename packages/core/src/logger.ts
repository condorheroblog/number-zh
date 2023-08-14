export const logger = {
	log(message: number | string) {
		console.log(`[LOG] ${message}`);
	},

	error(message: number | string) {
		console.error(`[ERROR] ${message}`);
	},

	info(message: number | string) {
		console.info(`[INFO] ${message}`);
	},

	warn(message: number | string) {
		console.warn(`[WARN] ${message}`);
	},
};
