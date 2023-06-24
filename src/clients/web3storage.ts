import { Web3Storage } from 'web3.storage'

export const web3storageClient = new Web3Storage({
  token: process.env.WEB3STORAGE_TOKEN ?? ''
})
