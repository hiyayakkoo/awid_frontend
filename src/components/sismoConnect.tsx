'use client'

import { sismoVerify } from '@/actions/sismoVerify'
import { sismoAppId } from '@/constants/sismo'
import {
  AuthType,
  SismoConnectButton,
  SismoConnectConfig,
  SismoConnectProof,
  SismoConnectResponse
} from '@sismo-core/sismo-connect-react'

import { FC, useState } from 'react'

type Props = {}

export const SismoConnect: FC<Props> = () => {
  const sismoConnectConfig: SismoConnectConfig = {
    appId: sismoAppId
  }

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [proofs, setProofs] = useState<SismoConnectProof[]>()

  const auths = [
    { authType: AuthType.EVM_ACCOUNT },
    { authType: AuthType.EVM_ACCOUNT }
  ]

  const handleVerify = async (response: SismoConnectResponse) => {
    // NOTE: exist a infinite fetching bug when loading is true

    setLoading(true)
    setError(null)
    try {
      const proofs = await sismoVerify(response, auths)
      setProofs(proofs)
      console.log(proofs)
    } catch (e) {
      setError(error)
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {!!proofs ? (
        <ul>
          {proofs.map(
            (p) =>
              p.auths && (
                <li key={p.auths[0].userId}>
                  <p>{p.auths[0].userId}</p>
                </li>
              )
          )}
        </ul>
      ) : (
        <SismoConnectButton
          config={sismoConnectConfig}
          auths={auths}
          onResponse={handleVerify}
          loading={loading}
          text="Register with Sismo"
        />
      )}
    </div>
  )
}
