import { mumbaiAddress } from '@/constants/identityController'
import { polygonMumbai, lineaTestnet } from 'wagmi/chains'

export const getAddress = (chainId: number) => {
  switch (chainId) {
    case polygonMumbai.id:
      return mumbaiAddress
    case lineaTestnet.id:
      return ''
    default:
      return ''
  }
}
