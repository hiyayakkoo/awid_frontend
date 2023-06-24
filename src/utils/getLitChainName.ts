import { polygonMumbai, lineaTestnet } from 'wagmi/chains'

export const getLitChainName = (chainId: number) => {
  switch (chainId) {
    case polygonMumbai.id:
      return 'mumbai'
    case lineaTestnet.id:
      return 'lineaGoerli'
    default:
      return ''
  }
}
