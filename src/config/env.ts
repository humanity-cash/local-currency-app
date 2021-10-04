import { DEV_CORE_API_URL, PROD_CORE_API_URL } from '@env';

const devEnvironmentVariables = {
    CORE_API_URL: DEV_CORE_API_URL,
}

const prodEnvironmentVariables = {
    CORE_API_URL: PROD_CORE_API_URL,
}

export default __DEV__ ? devEnvironmentVariables : prodEnvironmentVariables;