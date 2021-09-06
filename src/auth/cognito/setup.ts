
import { CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';

/**Cognito Setup */
const USERPOOL_ID = 'eu-west-1_Bwp861D2I'
const CLIENT_ID = '3arqlv58bqfepqg262fcdep3cq'

const poolData = {
	UserPoolId: USERPOOL_ID,
	ClientId: CLIENT_ID
};

export const userPool = new CognitoUserPool(poolData);

export const currtUser: CognitoUser | null = userPool.getCurrentUser();