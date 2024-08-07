import { HttpLink, InMemoryCache, ApolloClient } from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";

export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      // uri: "https://kltn2024.onrender.com/graphql",
      uri: process.env.NEXT_PUBLIC_API_GRAPHQL,
    }),
  });
});
