import { ApolloClient, InMemoryCache } from "@apollo/client";
import { env } from "process";

const client = new ApolloClient({
  uri: env.SUBGRAPH_URL,
  cache: new InMemoryCache(),
});

export default client;