import type { AppProps } from 'next/app';
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';

import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";

import Layout from "../components/Layout";

import "@rainbow-me/rainbowkit/styles.css"
import '../styles/globals.css'

import { RainbowKitSiweNextAuthProvider, GetSiweMessageOptions } from '@rainbow-me/rainbowkit-siwe-next-auth';
import {
  getDefaultWallets,
  connectorsForWallets,
  RainbowKitProvider,
  wallet,
  lightTheme
} from '@rainbow-me/rainbowkit';
import { infuraProvider } from 'wagmi/providers/infura';
import { publicProvider } from 'wagmi/providers/public';

const { chains, provider, webSocketProvider } = configureChains(
  [chain.polygonMumbai],
  [
    infuraProvider({ apiKey: process.env.NEXT_PUBLIC_INFURA_API_KEY }),
    publicProvider(),
  ]
)

const { wallets } = getDefaultWallets({
  appName: 'The Giving',
  chains,
})

const appInfo = {
  appName: 'The Giving',
}

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: 'Other',
    wallets: [
      wallet.argent({ chains }),
      wallet.trust({ chains }),
      wallet.ledger({ chains }),
    ],
  },
])

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
})

const getSiweMessageOptions: GetSiweMessageOptions = () => ({
  statement: 'Sign in to The Giving',
})

export default function App({ Component, pageProps }: AppProps<{ session: Session }>) {
  return (
    <SessionProvider refetchInterval={0} session={pageProps.session}>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitSiweNextAuthProvider getSiweMessageOptions={getSiweMessageOptions}>
          <RainbowKitProvider
            appInfo={appInfo}
            chains={chains}
            theme={lightTheme({
              accentColor: '#065F46',
              accentColorForeground: 'white',
              fontStack: 'system',
              borderRadius: 'small',
              overlayBlur: 'small',
            })}>
            <ApolloProvider client={client}>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </ApolloProvider>
          </RainbowKitProvider>
        </RainbowKitSiweNextAuthProvider>
      </WagmiConfig>
    </SessionProvider>
  );
};
