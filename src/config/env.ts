const DEV_CORE_API_URL = "https://alfajores2.api.humanity.cash";
const PROD_CORE_API_URL = "https://alfajores2.api.humanity.cash";

export const DWOLLA_PRIVACY_URL = "https://www.dwolla.com/legal/privacy/";
export const DWOLLA_TERMS_URL = "https://www.dwolla.com/legal/tos/";

export const BERKSHARE_PRIVACY_URL = "https://rib.ogg.mybluehost.me/wp-content/uploads/2021/08/Privacy-Form-Neighborly.pdf";
export const BERKSHARE_TERMS_URL = "https://berkshares.org/about/terms-and-conditions/";

const devEnvironmentVariables = {
    CORE_API_URL: DEV_CORE_API_URL,
}

const prodEnvironmentVariables = {
    CORE_API_URL: PROD_CORE_API_URL,
}

export default __DEV__ ? devEnvironmentVariables : prodEnvironmentVariables;