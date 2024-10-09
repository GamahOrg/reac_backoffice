import { Configuration } from "@app/core/configurations/shared.config";

export const environment = {
    // production: false,
    // baseURL: "http://192.168.194.171:3333",
    // securityURl: "http://192.168.194.171:222"
    production: Configuration.environments.development.production,
<<<<<<< HEAD
     baseURL: Configuration.environments.development.baseURL,
     securityURl:Configuration.environments.development.securityURl,
    // securityURl: "http://38.170.241.69:222",
    // baseURL: "http://38.170.241.69:333",
    // securityURl: "http://38.170.241.69:207"
      // baseURL: "https://localhost:7156",
       // securityURl: "http://localhost:7144"
=======
    // baseURL: Configuration.environments.development.baseURL,
    // securityURl:Configuration.environments.development.securityURl,
    // securityURl: "http://38.170.241.69:222",
    // baseURL: "http://38.170.241.69:333",
    // securityURl: "http://38.170.241.69:207"
       baseURL: "https://localhost:7156",
        securityURl: "http://localhost:7144"
>>>>>>> 910efd1d2c19bc2d88629a7f7f73ce7a05c1c5a7
};
