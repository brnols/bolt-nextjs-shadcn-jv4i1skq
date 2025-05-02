// config/index.js
import developmentConfig from "./development";
import stagingConfig from "./staging";
import productionConfig from "./production";

// Determinação do ambiente atual
const getEnvironment = () => {
    // Tenta obter do processo ou variáveis definidas na compilação
    // webpack.DefinePlugin ou equivalentes geralmente definem estas variáveis
    if (process.env.NODE_ENV === "production") {
        // Em produção, podemos ter sub-ambientes
        return process.env.APP_ENV || "production";
    }

    return process.env.NODE_ENV || "development";
};

// Seleção da configuração com base no ambiente
const environmentConfigs = {
    development: developmentConfig,
    staging: stagingConfig,
    production: productionConfig,
};

const env = getEnvironment();
const config = environmentConfigs[env] || developmentConfig;

// Para depuração durante desenvolvimento
if (config.debug) {
    console.log(`[Config] Usando configuração do ambiente: ${config.env}`);
}

export default config;
