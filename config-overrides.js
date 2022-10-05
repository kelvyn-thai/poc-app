const predeploy = require("./scripts/predeploy");
const production = require("./scripts/production");

const isPredeploy = process.env.REACT_APP_ENVIROMENT === "predeploy";
const isProduction = process.env.NODE_ENV === "production";
const isDevelopment = process.env.NODE_ENV === "development";

module.exports = function override(config, env) {
  if (isPredeploy) {
    return predeploy(config, env);
  }
  if (isProduction) {
    return production(config, env);
  }
  return config;
};
