import {
  ApolloClient,
  ApolloLink,
  from,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { withScalars } from "apollo-link-scalars";
import { addMinutes } from "date-fns";
import { buildClientSchema, IntrospectionQuery } from "graphql";
// import authService from "src/services/auth-service";

import rawSchema from "../../gql-schema.json";

const schema = buildClientSchema(rawSchema as unknown as IntrospectionQuery);

const typesMap = {
  DateTime: {
    serialize: (parsed: unknown): unknown => parsed,
    parseValue: (raw: unknown): Date | null =>
      raw ? new Date(raw as string) : null,
  },
  Date: {
    serialize: (parsed: unknown): unknown =>
      addMinutes(parsed as Date, (parsed as Date).getTimezoneOffset() * -1),
    parseValue: (raw: unknown): Date | null =>
      raw ? new Date(raw as string) : null,
  },
};

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("accessToken") ?? "";

  // authService.generateToken((accessToken) => {
  //   token = accessToken;
  // });

  if (!token) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return headers;
  }

  return {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
  };
});

const httpLink = ApolloLink.from([
  withScalars({
    schema,
    typesMap,
  }),
  new HttpLink({
    uri: process.env.NEXT_PUBLIC_BASE_API_URL,
  }),
]);

const apolloClient = new ApolloClient({
  link: from([authLink, httpLink]),
  cache: new InMemoryCache(),
});

export default apolloClient;
