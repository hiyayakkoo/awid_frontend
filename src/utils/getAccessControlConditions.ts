import { Chain } from 'viem'
import { getAddress } from './getAddress'
import { getLitChainName } from './getLitChainName'

export const getAccessControlConditions = (chain: Chain, id: string) => {
  // NOTE: demo setting
  return [
    {
      contractAddress: '',
      standardContractType: '',
      chain: getLitChainName(chain.id),
      method: 'eth_getBalance',
      parameters: [':userAddress', 'latest'],
      returnValueTest: {
        comparator: '>=',
        value: '1000000000000'
      }
    }
  ]

  return [
    {
      contractAddress: getAddress(chain.id),
      standardContractType: 'evmContract',
      chain: getLitChainName(chain.id),
      method: 'getVisibility',
      parameters: [id],
      returnValueTest: {
        key: '',
        comparator: '=',
        value: 'true'
      }
    },
    { operator: 'or' },
    {
      contractAddress: getAddress(chain.id),
      standardContractType: 'evmContract',
      chain: getLitChainName(chain.id),
      method: 'addressToId',
      parameters: [':userAddress'],
      returnValueTest: {
        key: '',
        comparator: '=',
        value: id
      }
    }
  ]
}
