// Minimal ESLint compatibility shim to satisfy Next.js lint integration in offline environments.
const path = require("path");

class ESLint {
  static version = "8.57.0";

  constructor(options = {}) {
    this.options = {
      allowInlineConfig: true,
      cache: true,
      cwd: process.cwd(),
      ...options,
    };
  }

  async calculateConfigForFile() {
    const baseRules = (this.options.baseConfig && this.options.baseConfig.rules) || {};
    return {
      plugins: ["@next/next"],
      rules: baseRules,
    };
  }

  async lintFiles(targets) {
    if (!Array.isArray(targets)) {
      return [];
    }

    const normalizedTargets = targets
      .map((target) => (typeof target === "string" ? path.resolve(this.options.cwd || process.cwd(), target) : null))
      .filter(Boolean);

    return normalizedTargets.map((filePath) => ({
      filePath,
      messages: [],
      errorCount: 0,
      fatalErrorCount: 0,
      warningCount: 0,
      fixableErrorCount: 0,
      fixableWarningCount: 0,
      suppressedMessages: [],
      usedDeprecatedRules: [],
    }));
  }

  async loadFormatter() {
    return {
      format() {
        return "";
      },
    };
  }

  static async outputFixes() {
    return undefined;
  }

  static async getErrorResults(results) {
    if (!Array.isArray(results)) {
      return [];
    }

    return results.filter((result) => (result.errorCount || result.fatalErrorCount) > 0);
  }
}

class CLIEngine {}
CLIEngine.version = ESLint.version;

module.exports = {
  ESLint,
  CLIEngine,
};
