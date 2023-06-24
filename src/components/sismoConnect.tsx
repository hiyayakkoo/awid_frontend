'use client'

import { sismoVerify } from '@/actions/sismoVerify'
import { sismoAppId } from '@/constants/sismo'
import { accessControlConditions, litChain } from '@/constants/lit'
import {
  AuthType,
  SismoConnectButton,
  SismoConnectConfig,
  SismoConnectProof,
  SismoConnectResponse
} from '@sismo-core/sismo-connect-react'

import { FC, useState } from 'react'
import {
  checkAndSignAuthMessage,
  decryptString,
  encryptString,
  uint8arrayToString
} from '@lit-protocol/lit-node-client'
import { storeJson } from '@/actions/ipfs/storeJson'
import { useRouter } from 'next/navigation'

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

  const router = useRouter()

  const handleSaveProofs = async () => {
    setLoading(true)
    setError(null)
    try {
      if (!!proofs) {
        const litNodeClient = new LitNodeClient()
        await litNodeClient.connect()

        const stringToEncrypt = JSON.stringify(proofs)

        const authSig = await checkAndSignAuthMessage({
          chain: litChain
        })

        const { encryptedString, symmetricKey } = await encryptString(
          stringToEncrypt
        )

        console.log({
          symmetricKey,
          authSig,
          litChain
        })

        const encryptedSymmetricKey: Uint8Array =
          await litNodeClient.saveEncryptionKey({
            accessControlConditions,
            symmetricKey,
            authSig,
            chain: litChain
          })

        const convertBlobToBase64 = (blob: Blob): Promise<string> =>
          new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onerror = reject
            reader.onload = () => {
              resolve(reader.result as string)
            }
            reader.readAsDataURL(blob)
          })
        // store encryptedSymmetricKey to IPFS
        const storeData: StoredFile = {
          key: uint8arrayToString(encryptedSymmetricKey, 'base16'),
          encryptedString: await convertBlobToBase64(encryptedString)
        }
        const cid = await storeJson(JSON.stringify(storeData))
        console.log(`stored cid: ${cid}`)
        router.push(`/mypage/${cid}`)

        const decryptedString = await decryptString(
          encryptedString,
          fetchedSymmetricKey
        )

        console.log('decryptedString', decryptedString)
      } else {
        console.error('the proofs is empty')
      }
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
    <div>
      {!!proofs ? (
        <div>
          <ul>
            {proofs.map(
              (p, i) =>
                p.auths && (
                  <li key={`${p.auths[0].userId}${i}`}>
                    <p>{p.auths[0].userId}</p>
                  </li>
                )
            )}
          </ul>
          <button onClick={handleSaveProofs}>Save to IPFS</button>
          {loading && <div>Loading...</div>}
        </div>
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
