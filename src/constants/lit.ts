export const litChain = 'goerli'

// TODO: fix
export const accessControlConditions = [
  {
    contractAddress: '',
    standardContractType: '',
    chain: litChain,
    method: 'eth_getBalance',
    parameters: [':userAddress', 'latest'],
    returnValueTest: {
      comparator: '>=',
      value: '1000000000000'
    }
  }
]
