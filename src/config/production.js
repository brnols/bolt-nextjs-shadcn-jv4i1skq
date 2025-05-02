// config/production.js
import base from './base';

const config = {
    ...base,
    env: 'production',
    debug: false,
    api: {
        ...base.api,
        baseUrl: "https://clients.paycentral.com.br",
        timeout: 15000, // Reduz timeout em produção
        mockResponses: false,
    },
    features: {
        ...base.features,
        analytics: true,
        experimentalFeatures: false,
    },
    // Configurações específicas de segurança para produção
    security: {
        contentSecurityPolicy: true,
        strictTransportSecurity: true,
    }
};

export default config;