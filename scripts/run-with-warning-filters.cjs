#!/usr/bin/env node

const { spawnSync } = require("node:child_process");
const path = require("node:path");

const args = process.argv.slice(2);
let suppressDep0040 = false;

if (args[0] === "--suppress-dep0040") {
  suppressDep0040 = true;
  args.shift();
}

if (args.length === 0) {
  console.error(
    "Usage: node scripts/run-with-warning-filters.cjs [--suppress-dep0040] <command> [args...]",
  );
  process.exit(1);
}

const [command, ...commandArgs] = args;
const env = {
  ...process.env,
  BROWSERSLIST_IGNORE_OLD_DATA: "true",
  BASELINE_BROWSER_MAPPING_IGNORE_OLD_DATA: "true",
};

const warningFilterModule = path.join(__dirname, "filter-tooling-warnings.cjs");
const nodeOptions = [];

if (env.NODE_OPTIONS?.trim()) {
  nodeOptions.push(env.NODE_OPTIONS.trim());
}

nodeOptions.push(`--require=${warningFilterModule}`);

if (suppressDep0040) {
  nodeOptions.push("--disable-warning=DEP0040");
}

env.NODE_OPTIONS = nodeOptions.join(" ");

const result = spawnSync(command, commandArgs, {
  env,
  stdio: "inherit",
  shell: process.platform === "win32",
});

if (result.error) {
  console.error(result.error.message);
  process.exit(1);
}

process.exit(result.status ?? 1);
