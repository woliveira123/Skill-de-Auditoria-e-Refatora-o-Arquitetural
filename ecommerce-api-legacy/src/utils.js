const config = {
    port: Number(process.env.PORT || 3000),
    paymentGatewayKey: process.env.PAYMENT_GATEWAY_KEY || null
};

let globalCache = {};
let totalRevenue = 0;

function logAndCache(key, data) {
    console.log(`[LOG] Salvando no cache: ${key}`);
    globalCache[key] = data;
}

const crypto = require('crypto');
function badCrypto(pwd) {
    return crypto.scryptSync(pwd, process.env.PASSWORD_PEPPER || 'local-development-only', 64).toString('hex');
}

module.exports = { config, logAndCache, badCrypto, globalCache, totalRevenue };
