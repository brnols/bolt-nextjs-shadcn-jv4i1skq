// config/base.js
const baseConfig = {
    // Valores padrão compartilhados por todos os ambientes
    app: {
        name: "Minha Aplicação",
        version: process.env.npm_package_version || "0.0.0",
    },
    api: {
        timeout: 30000, // 30 segundos
        retryAttempts: 3,
    },
    features: {
        darkMode: true,
        analytics: false,
    },
    // Funções de utilidade compartilhadas
    utils: {
        getFullApiUrl(path) {
            return `${this.api.baseUrl}${path}`;
        },
    },
};

export default baseConfig;
