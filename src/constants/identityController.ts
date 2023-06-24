import json from '@/utils/abi/IdentityController.json'

export const identityControllerABI = [...json] as const

export const mumbaiAddress =
  process.env.NEXT_PUBLIC_MUMBAI_IDENTITY_CONTROLLER_ADDRESS
