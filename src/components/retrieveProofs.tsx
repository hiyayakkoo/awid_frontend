'use client'

import { accessControlConditions, litChain } from '@/constants/lit'
import {
  checkAndSignAuthMessage,
  decryptString
} from '@lit-protocol/lit-node-client'
import { FC, useEffect, useRef, useState } from 'react'
import axios from 'axios'

type Props = {
  cid: string
}

export const RetrieveProofs: FC<Props> = ({ cid }) => {
  const fetchData = async (): Promise<string> => {
    const res = await axios.get<StoredFile>(
      `https://cloudflare-ipfs.com/ipfs/${cid}/data.json`
    )
    console.log('res.data', res.data)

    const litNodeClient = new LitNodeClient()
    await litNodeClient.connect()

    const authSig = await checkAndSignAuthMessage({
      chain: litChain
    })

    // Decrypto
    const fetchedSymmetricKey = await litNodeClient.getEncryptionKey({
      accessControlConditions,
      toDecrypt: res.data.key,
      chain: litChain,
      authSig
    })

    const base64Response = await fetch(res.data.encryptedString)
    const blob = await base64Response.blob()
    const decryptedString = await decryptString(blob, fetchedSymmetricKey)

    return decryptedString
  }

  const [data, setData] = useState<string>('loading')
  const once = useRef()
  useEffect(() => {
    ;(async () => {
      const data = await fetchData()
      setData(data)
    })()
  }, [once])

  return <div>{data}</div>
}
