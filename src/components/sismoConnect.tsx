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

type Props = {
  authNum: number | undefined
}

export const SismoConnect: FC<Props> = ({ authNum }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const auths = !!authNum
    ? [
        { authType: AuthType.VAULT },
        ...new Array(authNum).fill({ authType: AuthType.EVM_ACCOUNT })
      ]
    : []

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

  return (
    <SismoConnectButton
      config={sismoConnectConfig}
      auths={auths}
      onResponse={handleVerify}
      loading={loading}
      text={authNum != 0 ? 'Register with Sismo' : 'Sign in with Sismo'}
      overrideStyle={{
        height: '2.5rem'
      }}
      callbackUrl={`${urlRoot}/profile/edit`}
    />
  )
}
