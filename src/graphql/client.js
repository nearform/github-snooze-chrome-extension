import { createClient, dedupExchange, cacheExchange, fetchExchange } from 'urql';
import { authExchange } from '@urql/exchange-auth';
import { makeOperation } from '@urql/core';
import { SK_PAT, SK_USER } from '../constants';
import { readFromLocalStorage } from '../api/chrome';

const getAuth = async ({ authState }) => {
  if (!authState) {
      const { pat } = await readFromLocalStorage([SK_PAT, SK_USER])

      if (!pat) {
          throw Error('PAT not available.') 
      }

      return { token: pat }
  }

  return null;
};

const addAuthToOperation = ({ authState, operation }) => {
  if (!authState || !authState.token) {
    return operation;
  }

  const fetchOptions =
    typeof operation.context.fetchOptions === 'function'
      ? operation.context.fetchOptions()
      : operation.context.fetchOptions || {};

  return makeOperation(operation.kind, operation, {
    ...operation.context,
    fetchOptions: {
      ...fetchOptions,
      headers: {
        ...fetchOptions.headers,
        Authorization: `Bearer ${authState.token}`,
      },
    },
  });
};

const didAuthError = ({ error }) => {
  return error.graphQLErrors.some(e => e.extensions?.code === 'FORBIDDEN');
};

export const getGraphqlClient = () => createClient({
  url: 'https://api.github.com/graphql',
  exchanges: [
      dedupExchange,
      cacheExchange,
      authExchange({
          addAuthToOperation,
          didAuthError,
          getAuth,
        }),
      fetchExchange
    ]
});
