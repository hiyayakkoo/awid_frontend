'use server'

import { sismoConnectConfig } from '@/constants/sismo'
import {
  SismoConnectConfig,
  SismoConnectVerifiedResult,
  SismoConnectServer,
  AuthRequest,
  SismoConnectProof
} from '@sismo-core/sismo-connect-server'

export const sismoVerify = async (
  response: any,
  auths?: AuthRequest[]
): Promise<SismoConnectProof[]> => {
  const sismoConnect = new SismoConnectServer({ config: sismoConnectConfig })

  try {
    const result: SismoConnectVerifiedResult = await sismoConnect?.verify(
      response,
      {
        auths
      }
    )

    return result.response.proofs
  } catch (e: any) {
    throw e
  }
}
