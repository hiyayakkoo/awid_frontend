'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../app/style'
import { WagmiConfig, configureChains, createConfig } from 'wagmi'
import { polygonMumbai, lineaTestnet } from 'wagmi/chains'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
import {
  RainbowKitProvider,
  connectorsForWallets
} from '@rainbow-me/rainbowkit'
import { useEffect, useState } from 'react'
import { metaMaskWallet } from '@rainbow-me/rainbowkit/wallets'

export function Providers({ children }: { children: React.ReactNode }) {
  const { chains, publicClient } = configureChains(
    [polygonMumbai, lineaTestnet],
    [
      alchemyProvider({
        apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY ?? ''
      }),
      publicProvider()
    ]
  )

  const projectId = 'Autonomous World ID'

  const connectors = connectorsForWallets([
    {
      groupName: 'Recommended',
      wallets: [metaMaskWallet({ projectId, chains })]
    }
  ])

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
