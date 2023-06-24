import { Chain } from 'viem'
import { getAddress } from './getAddress'

export const getAccessControlConditions = (chain: Chain, id: string) => {
  return [
    {
      contractAddress: getAddress,
      standardContractType: 'evmContract',
      chain: chain,
      method: 'getVisibility',
      parameters: [':userAddress'],
      returnValueTest: {
        comparator: '=',
        value: 'true'
      }
    },
    { operator: 'or' },
    {
      contractAddress: getAddress,
      standardContractType: 'evmContract',
      chain: chain,
      method: 'addressToId',
      parameters: [':userAddress'],
      returnValueTest: {
        comparator: '=',
        value: id
      }
    }
  ]
}
