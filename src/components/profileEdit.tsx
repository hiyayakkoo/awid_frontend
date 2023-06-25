'use client'

import {
  VStack,
  Text,
  Divider,
  HStack,
  Input,
  Container,
  Select,
  Box,
  Icon,
  Image,
  Avatar,
  Table,
  TableContainer,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Switch,
  Button,
  SkeletonText,
  useToast,
  position
} from '@chakra-ui/react'
import { FC, createRef, useCallback, useEffect, useMemo, useState } from 'react'
import Dropzone, { DropzoneRef, FileRejection } from 'react-dropzone'
import { CloudUploadOutlined, VisibilityOffOutlined } from '@mui/icons-material'
import imageCompression from 'browser-image-compression'
import { convertBlobToBase64 } from '@/utils/blobToBase64'
import {
  checkAndSignAuthMessage,
  encryptString,
  uint8arrayToString
} from '@lit-protocol/lit-node-client'
import { storeJson } from '@/actions/ipfs/storeJson'
import { useRouter } from 'next/navigation'
import {
  SismoConnectProof,
  useSismoConnect
} from '@sismo-core/sismo-connect-react'
import { sismoConnectConfig } from '@/constants/sismo'
import { StoredFile } from '@/model/storedFile'
import { ConnectButton, useConnectModal } from '@rainbow-me/rainbowkit'
import {
  useAccount,
  useContractEvent,
  useContractRead,
  useContractWrite,
  useNetwork
} from 'wagmi'
import { getAddress } from '@/utils/getAddress'
import { identityControllerABI } from '@/constants/identityController'
import { getLitChainName } from '@/utils/getLitChainName'
import { getAccessControlConditions } from '@/utils/getAccessControlConditions'
import { Log } from 'viem'

const MAX_SIZE = 5242880

export const ProfileEdit: FC<{}> = () => {
  const dropzoneRef = createRef<DropzoneRef>()
  const [errors, setErrors] = useState('')
  const [name, setName] = useState('')
  const [base64Image, setBase64Image] = useState('')
  const [visible, setVisible] = useState(true)
  const [selectedAccounts, setSelectedAccounts] = useState<boolean[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const router = useRouter()

  // Name
  const handleChangeName = useCallback((value: string) => {
    setName(value)
  }, [])

  // Profile
  const handleDrop = useCallback(
    async (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      if (fileRejections.length > 0) {
        fileRejections.forEach((file) => {
          file.errors.forEach((err) => {
            if (err.code === 'file-too-large') {
              setErrors(`Error: File size must be less than 5 MB`)
            }

            setErrors(`Error: ${err.message}`)
          })
        })
      } else {
        if (acceptedFiles[0]) {
          const options = {
            maxSizeMB: 0.5,
            maxWidthOrHeight: 800,
            useWebWorker: true
          }

          const compressedFile = await imageCompression(
            acceptedFiles[0],
            options
          )

          const data = await convertBlobToBase64(compressedFile)
          setBase64Image(data)
          const objectURL = URL.createObjectURL(acceptedFiles[0])
          URL.revokeObjectURL(objectURL)
          setErrors('')
        }
      }
    },
    []
  )

  // Visibility
  const handleChangeVisibility = useCallback((value: string) => {
    switch (value) {
      case 'public':
        setVisible(true)
        break
      case 'private':
        setVisible(false)
        break
    }
  }, [])

  // Accounts
  const { response } = useSismoConnect({ config: sismoConnectConfig })

  const proofs: SismoConnectProof[] = useMemo(() => {
    if (response == null) {
      return []
    }

    if (response.proofs.length == 1) {
      const firstProof = response.proofs[0]
      const auths = firstProof.auths ?? []
      const firstAuth = auths[0]

      router.push(`/profile/${firstAuth?.userId}`)
    }

    const proofMap = new Map<string, SismoConnectProof>()
    response.proofs.forEach((p, i) => {
      if (i == 0) {
        // NOTE: skip vault ID
        return
      }
      if (p.auths && p.auths[0].userId != undefined) {
        proofMap.set(p.auths[0].userId, p)
      }
    })

    const uniqueProofs = Array.from(proofMap.values())

    if (uniqueProofs.length != 0) {
      setSelectedAccounts(new Array<boolean>(uniqueProofs.length).fill(true))
    }

    return uniqueProofs
  }, [response])

  const vaultId = useMemo(() => {
    const proof = response?.proofs[0]
    const auths = proof?.auths
    if (auths == undefined || auths.length == 0) {
      return undefined
    }
    return auths[0].userId
  }, [response])

  const handleSelectAccount = useCallback(
    (value: boolean, index: number) => {
      const copy = selectedAccounts
      copy.splice(index, 1, value)

      setSelectedAccounts(copy)
    },
    [selectedAccounts]
  )
  const [stateString, setStateString] = useState<string>()

  const { chain } = useNetwork()
  const { isLoading: createIsLoading, write: create } = useContractWrite({
    address: getAddress(chain?.id ?? 0) as `0x${string}`,
    abi: identityControllerABI,
    functionName: 'createIdentity',
    onSuccess: () => {
      setStateString('Waiting tx finish...')
    }
  })

  const { isLoading: updateIsLoading, write: update } = useContractWrite({
    address: getAddress(chain?.id ?? 0) as `0x${string}`,
    abi: identityControllerABI,
    functionName: 'updateIdentity',
    onSuccess: () => {
      setStateString('Waiting tx finish...')
    }
  })

  const { address: account } = useAccount()
  const toast = useToast()

  const { data, isError, isLoading } = useContractRead({
    address: getAddress(chain?.id ?? 0) as `0x${string}`,
    abi: identityControllerABI,
    functionName: 'addressToId',
    args: [account]
  })

  const [isContractLoading, setIsContractLoading] = useState<boolean>(false)

  const handleSaveProfile = async () => {
    console.log('addressToId', data)
    setLoading(true)
    setError(null)
    try {
      if (!!proofs && !!chain && !!vaultId) {
        setStateString('Start loading...')
        const filteredProofs = proofs.filter((_, i) => selectedAccounts[i])

        const litNodeClient = new LitNodeClient()
        await litNodeClient.connect()

        const stringToEncrypt = JSON.stringify({
          proofs: filteredProofs,
          name,
          profileImage: base64Image
        })

        setStateString('Waiting a sign...')
        const authSig = await checkAndSignAuthMessage({
          chain: getLitChainName(chain.id)
        })

        setStateString('Encrypting...')
        const { encryptedString, symmetricKey } = await encryptString(
          stringToEncrypt
        )

        const accessControlConditions = getAccessControlConditions(
          chain,
          vaultId
        )

        setStateString('Store to IPFS...')
        const encryptedSymmetricKey: Uint8Array =
          await litNodeClient.saveEncryptionKey({
            accessControlConditions,
            symmetricKey,
            authSig,
            chain: getLitChainName(chain.id)
          })

        // store encryptedSymmetricKey to IPFS
        const storeData: StoredFile = {
          key: uint8arrayToString(encryptedSymmetricKey, 'base16'),
          encryptedString: await convertBlobToBase64(encryptedString)
        }
        const cid = await storeJson(JSON.stringify(storeData))

        setStateString('Store to the contract...')
        setIsContractLoading(true)
        // store cid and public/private flag with EOA address to contract
        if (!!data) {
          update({ args: [vaultId, cid, visible] })
        } else {
          create({ args: [vaultId, cid, visible] })
        }
      } else {
        console.error('the proofs is empty')
      }
    } catch (e) {
      setError(error)
      console.error(e)
      const err = e as Error
      toast({
        status: 'error',
        description: err.message
      })
    } finally {
      setLoading(false)
    }
  }

  const callbackEventFunc = (log: Log[]) => {
    console.log('Event log', log)
    toast({
      status: 'success',
      title: 'Store success!',
      position: 'top-right'
    })
    setStateString('')
    setIsContractLoading(false)

    const l = log[0] as unknown as {
      args: { id: string; cid: string; visibility: boolean }
    }
    const id = l.args.id

    router.push(`/profile/${id}`)
  }

  useContractEvent({
    address: getAddress(chain?.id ?? 0) as `0x${string}`,
    abi: identityControllerABI,
    eventName: 'CreateIdentity',
    listener(log) {
      callbackEventFunc(log)
    }
  })

  useContractEvent({
    address: getAddress(chain?.id ?? 0) as `0x${string}`,
    abi: identityControllerABI,
    eventName: 'UpdateIdentity',
    listener(log) {
      callbackEventFunc(log)
    }
  })

  const { openConnectModal } = useConnectModal()
  const { address, isConnected } = useAccount()
  useEffect(() => {
    console.log(address)
  }, [address])

  return (
    <VStack w="full">
      <Box position="relative" mb={32}>
        <Box position="absolute" top={2} right={2} zIndex={10}>
          <ConnectButton />
        </Box>
        <Image src="/images/header-sm.png" w="full" alt="header" />
        <Container maxW="container.xl">
          <HStack spacing={4} position="absolute" bottom={-24}>
            <Avatar
              size="2xl"
              borderWidth={3}
              borderColor="white"
              shadow="xl"
              src={base64Image}
            />
            <Text fontSize="2xl" fontWeight="bold">
              {name != '' ? name : 'Anonymous'}
            </Text>
            {!visible && (
              <Icon as={VisibilityOffOutlined} color="gray.300" w={6} />
            )}
          </HStack>
        </Container>
      </Box>
      <Container maxW="container.xl" pb={32}>
        {/* Profile */}
        <VStack w="full" spacing={8}>
          <VStack w="fill" alignItems="start">
            <Text fontSize="md" fontWeight="bold">
              AWID Profile
            </Text>
            <Text>
              Please create a profile here, and select the information for the
              accounts to be saved. The zk-proof of the account is saved after
              encryption on IPFS. This information is only disclosed to third
              parties if you want to make it public.
            </Text>
          </VStack>
          <Divider />

          {/* Name */}
          <HStack w="full">
            <VStack w="50%" alignItems="start">
              <Text fontSize="sm" fontWeight="bold">
                Name
              </Text>
              <Text>This will be displayed on you profile.</Text>
            </VStack>
            <Input
              placeholder="Vitalik Buterin"
              w="50%"
              onChange={(e) => handleChangeName(e.target.value)}
            />
          </HStack>
          <Divider />

          {/* Image */}
          <HStack w="full">
            <VStack w="50%" alignItems="start">
              <Text fontSize="sm" fontWeight="bold">
                Profile image
              </Text>
              <Text>This will be displayed on you profile.</Text>
            </VStack>

            <Box w="50%">
              <Dropzone
                ref={dropzoneRef}
                onDrop={handleDrop}
                maxFiles={1}
                maxSize={MAX_SIZE}
              >
                {({ getRootProps, getInputProps, isDragActive }) => (
                  <Box {...getRootProps()} w="full">
                    <Box as="input" w="full" h="full" {...getInputProps()} />

                    <VStack
                      p={6}
                      borderWidth={1}
                      borderColor="gray.300"
                      borderRadius={6}
                      cursor="pointer"
                    >
                      <Icon as={CloudUploadOutlined} />
                      <Text>
                        Click to upload or drag and drop
                        <br /> SVG, PNG, JPG (max. 5MB)
                      </Text>
                    </VStack>
                  </Box>
                )}
              </Dropzone>
              <Text size="sm" color="red.500">
                {errors}
              </Text>
            </Box>
          </HStack>
          <Divider />

          {/* Visibility */}
          <HStack w="full">
            <VStack w="50%" alignItems="start">
              <Text fontSize="sm" fontWeight="bold">
                Visibility setting
              </Text>
              <Text>
                Setting the scope to public. If set to private, only you will be
                able to view it.
              </Text>
            </VStack>
            <Select
              w="50%"
              onChange={(e) => handleChangeVisibility(e.target.value)}
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
            </Select>
          </HStack>
          <Divider />

          {/* EOA */}
          <HStack w="full">
            <VStack w="50%" alignItems="start">
              <Text fontSize="sm" fontWeight="bold">
                Accounts
              </Text>
              <Text>
                The accounts selected here and its respective zk proof will be
                disclosed.
              </Text>
            </VStack>
            <TableContainer
              w="50%"
              borderWidth={1}
              borderColor="gray.300"
              borderRadius={6}
            >
              <Table>
                <Thead>
                  <Tr>
                    <Th>Account</Th>
                    <Th w="10%">Connection</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {response == null && (
                    <>
                      <Tr>
                        <Td>
                          <SkeletonText w="full" noOfLines={1} />
                        </Td>
                        <Td>
                          <SkeletonText w="full" noOfLines={1} />
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>
                          <SkeletonText w="full" noOfLines={1} />
                        </Td>
                        <Td>
                          <SkeletonText w="full" noOfLines={1} />
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>
                          <SkeletonText w="full" noOfLines={1} />
                        </Td>
                        <Td>
                          <SkeletonText w="full" noOfLines={1} />
                        </Td>
                      </Tr>
                    </>
                  )}
                  {proofs.map(
                    (p, i) =>
                      p.auths && (
                        <Tr key={`${p.auths[0].userId}${i}`}>
                          <Td>{p.auths[0].userId}</Td>
                          <Td>
                            <Switch
                              onChange={(e) =>
                                handleSelectAccount(e.target.checked, i)
                              }
                              defaultChecked
                            />
                          </Td>
                        </Tr>
                      )
                  )}
                </Tbody>
              </Table>
            </TableContainer>
          </HStack>
          <Divider />

          <HStack justify="end" w="full">
            {isConnected ? (
              <VStack>
                <Button
                  onClick={handleSaveProfile}
                  isLoading={
                    loading ||
                    createIsLoading ||
                    updateIsLoading ||
                    isContractLoading
                  }
                >
                  Save changes
                </Button>
                <Text fontSize="sm">{stateString}</Text>
              </VStack>
            ) : (
              <Button onClick={openConnectModal}>Connect</Button>
            )}
          </HStack>
        </VStack>
      </Container>
    </VStack>
  )
}
