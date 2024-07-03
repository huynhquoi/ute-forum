"use client";

import { ApolloLink, concat, split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { HttpLink } from '@apollo/client';
import {
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  NextSSRApolloClient,
  SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr';

import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { setContext } from '@apollo/client/link/context';

function getToken() {
  // Implement your logic to get the token, e.g., from cookies or local storage
  return typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
}

function makeClient() {
  const httpLink = new HttpLink({
    // uri: "https://kltn2024.onrender.com/graphql",
    uri: "https://forumnew-225d.onrender.com/graphql",
    fetchOptions: { cache: "no-store" },
  });

  const authLink = setContext((_, { headers }) => {
    const token = getToken();
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      }
    };
  });

  const wsLink = new GraphQLWsLink(createClient({
    // url: 'ws://kltn2024.onrender.com/graphql',
    url: 'ws://forumnew-225d.onrender.com/graphql',
    connectionParams: () => {
      const token = getToken();
      return {
        headers: {
          authorization: token ? `Bearer ${token}` : "",
        },
      };
    },
  }));

  const link = split(
    // split based on operation type
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    authLink.concat(httpLink), // Use authLink to include token in httpLink
  );

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link:
      typeof window === "undefined"
        ? ApolloLink.from([new SSRMultipartLink({ stripDefer: true }), link])
        : link,
  });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
