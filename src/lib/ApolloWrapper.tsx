"use client";

// import { ApolloLink, HttpLink } from "@apollo/client";
// import {
//   ApolloNextAppProvider,
//   NextSSRInMemoryCache,
//   NextSSRApolloClient,
//   SSRMultipartLink,
// } from "@apollo/experimental-nextjs-app-support/ssr";

// function makeClient() {
//   const httpLink = new HttpLink({
//     uri: "https://kltn2024.onrender.com/graphql",
//     fetchOptions: { cache: "no-store" },
//   });

//   return new NextSSRApolloClient({
//     cache: new NextSSRInMemoryCache(),
//     link:
//       typeof window === "undefined"
//         ? ApolloLink.from([
//             new SSRMultipartLink({
//               stripDefer: true,
//             }),
//             httpLink,
//           ])
//         : httpLink,
//   });
// }

// export function ApolloWrapper({ children }: React.PropsWithChildren) {
//   return (
//     <ApolloNextAppProvider makeClient={makeClient}>
//       {children}
//     </ApolloNextAppProvider>
//   );
// }

import { ApolloLink, concat, split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';
import { HttpLink } from '@apollo/client';
import {
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  NextSSRApolloClient,
  SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr';

import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

function makeClient() {
  const httpLink = new HttpLink({
    uri: "https://kltn2024.onrender.com/graphql",
    fetchOptions: { cache: "no-store" },
  });

  // const wsLink = new WebSocketLink({
  //   uri: `ws://kltn2024.onrender.com/graphql`,
  //   options: {
  //     reconnect: true,
  //   },
  // });

  const wsLink = new GraphQLWsLink(createClient({
    url: 'ws://kltn2024.onrender.com/graphql',
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
    httpLink,
  );

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link:
      typeof window === "undefined"
        // ? concat(new SSRMultipartLink({ stripDefer: true }), link)
        ? ApolloLink.from([new SSRMultipartLink({ stripDefer: true, }), link])
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