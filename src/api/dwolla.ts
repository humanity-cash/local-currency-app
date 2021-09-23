import * as dwolla from "dwolla-v2";
import {
    DwollaClientOptions,
} from "./formatters";

const DWOLLA_APP_KEY="r25yOHtHXrmojK2XBnTUXSFjxzT1fQpmOdEAu3eo50CNqHjwDW";
const DWOLLA_APP_SECRET="uYWA0wHz5pf8Is26RfSvnZgEX5Rhyjyiq2yIxYka7m4T7xSZIl";

export const getAppToken = async (): Promise<dwolla.Client> => {
  const options: DwollaClientOptions = {
    key: DWOLLA_APP_KEY,
    secret: DWOLLA_APP_SECRET,
    environment: "sandbox",
  };
  return new dwolla.Client(options);
}

export const getIAVToken = async (id: string): Promise<string> => {
  const customerUrl = `https://api-sandbox.dwolla.com/customers/${id}`;
  const appToken: dwolla.Client = await getAppToken();

  const response = await appToken.post(`${customerUrl}/iav-token`);
  console.log("==============> iav token", response.body.token);
  return response.body.token;
}
