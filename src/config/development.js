// config/development.js
import base from "./base";

const config = {
    ...base,
    env: "development",
    debug: true,
    api: {
        ...base.api,
        // baseUrl: "https://dev-api.empresa.com/v1",
        baseUrl: "https://clients.paycentral.com.br",
        mockResponses: true,
    },
    features: {
        ...base.features,
        experimentalFeatures: true,
    },
    // Valores usados apenas em desenvolvimento
    devTools: {
        enableReduxLogger: true,
        slowNetworkSimulation: false,
    },
};

export default config;
