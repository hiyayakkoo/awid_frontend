'use server'

import { Web3Storage, File } from 'web3.storage'

export const storeJson = async (storeData: string): Promise<string> => {
  const client = new Web3Storage({
    token: process.env.WEB3STORAGE_TOKEN ?? ''
  })

  const buffer = Buffer.from(storeData)
  const files = [new File([buffer], 'data.json')]
  const cid = await client.put(files)
  return cid
}
