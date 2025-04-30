import { Configuration } from "@app/core/configurations/shared.config";

export const environment = {
  production: Configuration.environments.testingAndStaging.production,
  baseURL: Configuration.environments.testingAndStaging.baseURL,
  securityURl: Configuration.environments.testingAndStaging.securityURl,
    refreshTokenURl: Configuration.environments.testingAndStaging.refreshTokenURl,

    // baseURL: "http://38.170.241.69:208",
    // securityURl: "http://38.170.241.69:207"
};
