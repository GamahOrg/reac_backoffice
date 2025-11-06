import { Configuration } from "@app/core/configurations/shared.config";

export const environment = {
  production: Configuration.environments.production.production,
  baseURL: Configuration.environments.production.baseURL,
  securityURl: Configuration.environments.production.securityURl,
    // baseURL: "http://38.170.241.69:208",
    // securityURl: "http://38.170.241.69:207"
};
