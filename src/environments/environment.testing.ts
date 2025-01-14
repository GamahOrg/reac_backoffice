import { Configuration } from "@app/core/configurations/shared.config";

export const environment = {
    production: Configuration.environments.testingAndStaging.production,
    baseURL: Configuration.environments.testingAndStaging.baseURL,
    securityURl: Configuration.environments.testingAndStaging.securityURl,
    // baseURL: "https://reacbackend.asgatech.com",
    // baseURL: "http://38.170.241.69:208",
    // securityURl: "http://38.170.241.69:207"
    // baseURL: "http://192.168.194.171:333",
    // securityURl: "http://192.168.194.171:222"
    // baseURL: "http://38.170.241.69:333",
    // securityURl: "http://38.170.241.69:222"
};
