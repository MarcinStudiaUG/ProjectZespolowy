/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, concat } from '@apollo/client';
import { useAuth0 } from '@auth0/auth0-react';
import { useMemo } from 'react';

const publicClient = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:63380/graphql' }),
  cache: new InMemoryCache(),
});
//@ts-ignore
const ApolloWrapper = ({ children }) => {
  const { isAuthenticated, getIdTokenClaims } = useAuth0();

  const client = useMemo(() => {
    if (isAuthenticated) {
      return new ApolloClient({
        link: concat(
          //@ts-ignore
          async (operation, forward) => {
            const claims = await getIdTokenClaims();
            //@ts-ignore
            const token = claims.__raw;

            operation.setContext({
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            return forward(operation);
          },
          new HttpLink({ uri: 'http://localhost:63380/graphql' })
        ),
        cache: new InMemoryCache(),
      });
    }

    return publicClient;
  }, [isAuthenticated, getIdTokenClaims]);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloWrapper;