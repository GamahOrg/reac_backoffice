import { Configuration } from "@app/core/configurations/shared.config";

export const environment = {
  production: Configuration.environments.development.production,
  baseURL: Configuration.environments.development.baseURL,
  securityURl: Configuration.environments.development.securityURl,
    refreshTokenURl: Configuration.environments.development.refreshTokenURl,

    // baseURL: "http://38.170.241.69:208",
    // securityURl: "http://38.170.241.69:207"
};
