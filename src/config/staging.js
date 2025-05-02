// config/staging.js
import base from './base';

const config = {
    ...base,
    env: 'staging',
    debug: true,
    api: {
        ...base.api,
        baseUrl: "https://clients.paycentral.com.br",
        mockResponses: false,
    },
    features: {
        ...base.features,
        analytics: true,
        experimentalFeatures: true,
    }
};

export default config;