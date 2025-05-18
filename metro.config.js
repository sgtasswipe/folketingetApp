// metro.config.js
const { getDefaultConfig } = require("expo/metro-config");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Add this to allow Firebase to resolve correctly with CJS
config.resolver.sourceExts.push("cjs");

// Workaround for Firebase dual-package hazard
config.resolver.unstable_enablePackageExports = false;

module.exports = config;
