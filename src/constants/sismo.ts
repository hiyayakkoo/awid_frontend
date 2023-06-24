import { SismoConnectConfig } from '@sismo-core/sismo-connect-react'

const sismoAppId = process.env.NEXT_PUBLIC_SISMO_APP_ID ?? ''
export const sismoConnectConfig: SismoConnectConfig = {
  appId: sismoAppId
}
