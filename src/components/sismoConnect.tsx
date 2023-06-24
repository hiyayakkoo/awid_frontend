'use client'

import { sismoVerify } from '@/actions/sismoVerify'
import { sismoConnectConfig } from '@/constants/sismo'
import {
  AuthType,
  SismoConnectButton,
  SismoConnectProof,
  SismoConnectResponse
} from '@sismo-core/sismo-connect-react'

import { FC, useState } from 'react'

import { urlRoot } from '@/constants/common'
import { litChain } from '@/constants/lit'

type Props = {}

export const SismoConnect: FC<Props> = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [proofs, setProofs] = useState<SismoConnectProof[]>()

  const auths = [
    { authType: AuthType.VAULT },
    { authType: AuthType.EVM_ACCOUNT },
    { authType: AuthType.EVM_ACCOUNT }
  ]

  const handleVerify = async (response: SismoConnectResponse) => {
    // NOTE: exist a infinite fetching bug when loading is true

    setLoading(true)
    setError(null)
    try {
      await sismoVerify(response, auths)
    } catch (e) {
      setError(error)
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const accessControlConditions = [
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

  return (
    <SismoConnectButton
      config={sismoConnectConfig}
      auths={auths}
      onResponse={handleVerify}
      loading={loading}
      text="Register with Sismo"
      overrideStyle={{
        height: '2.5rem'
      }}
      callbackUrl={`${urlRoot}/profile/edit`}
    />
  )
}
