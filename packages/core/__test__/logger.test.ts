import type { SpyInstance } from "vitest";
import { describe, it, vi, beforeEach, afterEach } from "vitest";
import { logger } from "../src";

describe("Logger", () => {
	let consoleLogSpy: SpyInstance,
		consoleErrorSpy: SpyInstance,
		consoleInfoSpy: SpyInstance,
		consoleWarnSpy: SpyInstance;

	beforeEach(() => {
		consoleLogSpy = vi.spyOn(console, "log");
		consoleErrorSpy = vi.spyOn(console, "error");
		consoleInfoSpy = vi.spyOn(console, "info");
		consoleWarnSpy = vi.spyOn(console, "warn");
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it("should log a message", ({ expect }) => {
		logger.log("Test log message");
		expect(consoleLogSpy).toHaveBeenCalledWith("[LOG] Test log message");
	});

	it("should log an error message", ({ expect }) => {
		logger.error("Test error message");
		expect(consoleErrorSpy).toHaveBeenCalledWith("[ERROR] Test error message");
	});

	it("should log an info message", ({ expect }) => {
		logger.info("Test info message");
		expect(consoleInfoSpy).toHaveBeenCalledWith("[INFO] Test info message");
	});

	it("should log a warning message", ({ expect }) => {
		logger.warn("Test warning message");
		expect(consoleWarnSpy).toHaveBeenCalledWith("[WARN] Test warning message");
	});
});
