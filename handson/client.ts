import { createApiBuilderFromCtpClient as createImportApiBuilderFromCtpClient } from "@commercetools/importapi-sdk";
import { createApiBuilderFromCtpClient } from "@commercetools/platform-sdk";
import {
  AuthMiddlewareOptions,
  ClientBuilder,
  HttpMiddlewareOptions,
  PasswordAuthMiddlewareOptions,
} from "@commercetools/sdk-client-v2";
import fetch from "node-fetch";
import { ApiRoot, ImportApiRoot } from "../types/global";
import { Prefix, Config, readConfig } from "../utils/config";

const createApiClient = () => {
  const { oauthHost, clientId, clientSecret, projectKey, host }: Config =
    readConfig(Prefix.DEV);

  const authMiddlewareOptions: AuthMiddlewareOptions = {
    host: oauthHost,
    credentials: {
      clientId: clientId,
      clientSecret: clientSecret,
    },
    projectKey: projectKey,
    fetch,
  };

  const httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: host,
    fetch,
  };

  const client = new ClientBuilder()
    .withClientCredentialsFlow(authMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();

  return createApiBuilderFromCtpClient(client).withProjectKey({
    projectKey: projectKey,
  });
};

const createImportApiClient = () => {
  const { oauthHost, clientId, clientSecret, projectKey, host }: Config =
    readConfig(Prefix.IMPORT);

  const authMiddlewareOptions: AuthMiddlewareOptions = {
    host: oauthHost,
    credentials: {
      clientId: clientId,
      clientSecret: clientSecret,
    },
    projectKey: projectKey,
    fetch,
  };

  const httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: host,
    fetch,
  };

  const client = new ClientBuilder()
    .withClientCredentialsFlow(authMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();

  return createImportApiBuilderFromCtpClient(client).withProjectKeyValue({
    projectKey: projectKey,
  });
};

const createStoreApiClient = () => {
  const { oauthHost, clientId, clientSecret, projectKey, host }: Config =
    readConfig(Prefix.STORE);

  const authMiddlewareOptions: AuthMiddlewareOptions = {
    host: oauthHost,
    credentials: {
      clientId: clientId,
      clientSecret: clientSecret,
    },
    projectKey: projectKey,
    fetch,
  };

  const httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: host,
    fetch,
  };

  const client = new ClientBuilder()
    .withClientCredentialsFlow(authMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();

  return createApiBuilderFromCtpClient(client).withProjectKey({
    projectKey: projectKey,
  });
};

const createMyApiClient = () => {
  const {
    oauthHost,
    clientId,
    clientSecret,
    projectKey,
    host,
    username,
    password,
  }: Config = readConfig(Prefix.ME);

  const passwordAuthMiddlewareOptions: PasswordAuthMiddlewareOptions = {
    host: oauthHost,
    credentials: {
      clientId: clientId,
      clientSecret: clientSecret,
      user: {
        username: username,
        password: password,
      },
    },
    projectKey: projectKey,
    fetch,
  };

  const httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: host,
    fetch,
  };

  const client = new ClientBuilder()
    .withPasswordFlow(passwordAuthMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();

  return createApiBuilderFromCtpClient(client).withProjectKey({
    projectKey: projectKey,
  });
};

export const apiRoot: ApiRoot = createApiClient();
export const importApiRoot: ImportApiRoot = createImportApiClient();
export const storeApiRoot: ApiRoot = createStoreApiClient();
export const myApiRoot: ApiRoot = createMyApiClient();
