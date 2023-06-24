'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../app/style'
import { WagmiConfig, configureChains, createConfig } from 'wagmi'
import { polygonZkEvmTestnet, lineaTestnet } from 'wagmi/chains'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { useEffect, useState } from 'react'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'

export function Providers({ children }: { children: React.ReactNode }) {
  const { chains, publicClient } = configureChains(
    [polygonZkEvmTestnet, lineaTestnet],
    [
      alchemyProvider({ apiKey: process.env.ALCHEMY_ID ?? '' }),
      publicProvider()
    ]
  )

  const connectors = [new MetaMaskConnector()]

  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient
  })

  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <CacheProvider>
          <ChakraProvider theme={theme}>{mounted && children}</ChakraProvider>
        </CacheProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
