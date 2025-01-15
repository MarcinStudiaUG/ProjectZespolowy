import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';
import './index.css';
import ApolloWrapper from './ApolloWrapper';

const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: "http://localhost:5173/",
      }}
      cacheLocation='localstorage'
      useRefreshTokens={true}
    >
      <ApolloWrapper>
        <App />
        </ApolloWrapper> 
    </Auth0Provider>
  </StrictMode>
);
