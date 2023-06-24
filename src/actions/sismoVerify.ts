'use server'

import { sismoAppId } from '@/constants/sismo'
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
  const sismoConnectConfig: SismoConnectConfig = {
    // you can create a new Sismo Connect app at https://factory.sismo.io
    appId: sismoAppId
  }
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
