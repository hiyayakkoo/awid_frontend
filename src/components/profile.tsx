'use client'

import {
  Avatar,
  Box,
  Container,
  VStack,
  Text,
  Grid,
  GridItem,
  Card,
  CardBody,
  Image,
  HStack,
  Icon,
  Divider,
  IconButton,
  useColorModeValue,
  SkeletonText,
  SkeletonCircle,
  Skeleton,
  useColorMode,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Spinner,
  Center
} from '@chakra-ui/react'
import { FC, useEffect, useMemo, useRef, useState } from 'react'
import {
  Landscape,
  Edit,
  Groups,
  Insights,
  MoreVert
} from '@mui/icons-material'
import { useAccount, useContractRead, useNetwork, usePublicClient } from 'wagmi'
import { getAddress } from '@/utils/getAddress'
import { identityControllerABI } from '@/constants/identityController'
import {
  checkAndSignAuthMessage,
  decryptString
} from '@lit-protocol/lit-node-client'
import { getLitChainName } from '@/utils/getLitChainName'
import axios from 'axios'
import { StoredFile } from '@/model/storedFile'
import { getAccessControlConditions } from '@/utils/getAccessControlConditions'
import { games } from '@/constants/game'
import { AttestationData } from '@/components/attestationData'
import {
  GetRatingQueryDocument,
  GetRatingQueryQuery,
  execute
} from '../../.graphclient/index'

import { Chart as ChartJS, registerables } from 'chart.js'
import { Line } from 'react-chartjs-2'
import { ConnectButton } from '@rainbow-me/rainbowkit'

ChartJS.register(...registerables)

type Props = {
  id: string
}

export const Profile: FC<Props> = ({ id }) => {
  // TODO: get cid from contract by id
  const { chain } = useNetwork()

  const publicClient = usePublicClient()

  const fetchData = async (): Promise<string> => {
    let data = await publicClient.readContract({
      address: getAddress(chain?.id ?? 0) as `0x${string}`,
      abi: identityControllerABI,
      functionName: 'identities',
      args: [id]
    })

    if (!chain || !data) {
      return ''
    }

    const typeData = data as any[]

    console.log(data)
    const cid = typeData[0]

    const res = await axios.get<StoredFile>(
      `https://cloudflare-ipfs.com/ipfs/${cid}/data.json`
    )
    console.log('res.data', res.data)

    const litNodeClient = new LitNodeClient()
    await litNodeClient.connect()

    const authSig = await checkAndSignAuthMessage({
      chain: getLitChainName(chain.id)
    })

    const accessControlConditions = getAccessControlConditions(chain, id)
    console.log(accessControlConditions)

    // Decrypto
    const fetchedSymmetricKey = await litNodeClient.getEncryptionKey({
      accessControlConditions,
      toDecrypt: res.data.key,
      chain: getLitChainName(chain.id),
      authSig
    })

    const base64Response = await fetch(res.data.encryptedString)
    const blob = await base64Response.blob()
    const decryptedString = await decryptString(blob, fetchedSymmetricKey)

    console.log(decryptedString)

    return decryptedString
  }

  const [data, setData] = useState<string>()
  const once = useRef(false)
  useEffect(() => {
    ;(async () => {
      const data = await fetchData()
      console.log('data:', data)
      setData(data)
    })()
  }, [once])

  const parsedData = useMemo(() => {
    if (!data) {
      return undefined
    }
    return JSON.parse(data) as {
      proofs: string
      name: string
      profileImage: string
    }
  }, [data])

  useEffect(() => {
    if (!parsedData) {
      return
    }
    console.log('userId', parsedData.proofs[0].auths?.[0].userId ?? 'hogehoge')
  }, [parsedData])

  const { colorMode } = useColorMode()

  // Details modal
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [ratingData, setRatingData] = useState<GetRatingQueryQuery>()
  const handleOpen = async (userAddress: string, attester: string) => {
    onOpen()
    const res = await execute(GetRatingQueryDocument, {
      userAddress,
      attester
    })
    setRatingData(res.data)
  }

  return (
    <>
      <Box
        backgroundImage={'/images/header-lg.png'}
        backgroundSize="contain"
        backgroundRepeat={'no-repeat'}
        w="full"
        position="relative"
      >
        <Box position="absolute" top={2} right={2} zIndex={10}>
          <ConnectButton />
        </Box>
        <Box>
          <Image
            src={
              colorMode == 'light'
                ? '/images/logo-black.png'
                : '/images/logo-white.png'
            }
            alt="logo"
            w="200px"
          />
        </Box>
        <Container maxW="container.lg" py={10} px={10}>
          <VStack
            h="80vh"
            backgroundColor="gray.200"
            borderRadius={20}
            shadow="xl"
            position="relative"
            py={10}
            px={8}
          >
            {!!parsedData ? (
              <>
                <Avatar
                  size="xl"
                  borderWidth={3}
                  borderColor="white"
                  position="absolute"
                  top={-16}
                  src={parsedData?.profileImage}
                />
                <Text
                  fontSize="3xl"
                  py={6}
                  fontWeight="bold"
                  color="black"
                  position="relative"
                >
                  {!!parsedData?.name ? parsedData?.name : 'Anonymous'}
                  <IconButton
                    icon={<Icon as={Edit} />}
                    aria-label="edit"
                    position="absolute"
                    right={-12}
                    variant="unstyled"
                    pt={3}
                  />
                </Text>
              </>
            ) : (
              <>
                <SkeletonCircle
                  w="90px"
                  h="90px"
                  position="absolute"
                  top={-16}
                  opacity={1}
                  borderWidth={3}
                  borderColor="white"
                />
                <SkeletonText w={150} h={32} noOfLines={1} py={8} opacity={1} />
              </>
            )}

            {!!parsedData ? (
              <Grid
                templateColumns="repeat(3, 1fr)"
                gap={6}
                w="full"
                overflow="scroll"
              >
                {games.map((game) => (
                  <GridItem w="100%" h="300" key={game.name}>
                    <Card w="full" h="full" rounded={20} overflow="hidden">
                      <Box
                        h="60%"
                        overflow="hidden"
                        backgroundImage={`/images/games/${game.image}`}
                        backgroundSize="cover"
                        backgroundPosition="center"
                      />
                      <CardBody position="relative">
                        <IconButton
                          pt={2}
                          icon={<Icon as={MoreVert} />}
                          aria-label="edit"
                          variant="unstyled"
                          onClick={() =>
                            handleOpen(
                              '0x198d7d6522493c3a0136e1e90e2b58dacc522466',
                              '0xa9d5714a6ef0f9063fe160acc2b0cf0d049d2265'
                            )
                          }
                          position="absolute"
                          top={0}
                          right={0}
                        />
                        <VStack>
                          <VStack>
                            <Text>{game.name}</Text>
                            <HStack>
                              <Icon as={Insights} />
                              <Text fontSize="3xl" fontWeight="bold">
                                <AttestationData
                                  EOA={
                                    parsedData.proofs[0].auths?.[0].userId ?? ''
                                  }
                                  ratingContract={game.contract}
                                />
                              </Text>
                            </HStack>
                          </VStack>

                          <Divider />
                          <HStack spacing={6}>
                            <HStack>
                              <Icon as={Landscape} />
                              <Text fontSize="lg" fontWeight="bold">
                                Not played
                              </Text>
                            </HStack>
                            <HStack>
                              <Icon as={Groups} />
                              <Text fontSize="lg" fontWeight="bold">
                                {Math.floor(Math.random() * (500 - 100) + 100)}
                              </Text>
                            </HStack>
                          </HStack>
                        </VStack>
                      </CardBody>
                    </Card>
                  </GridItem>
                ))}
              </Grid>
            ) : (
              <Grid templateColumns="repeat(3, 1fr)" gap={6} w="full">
                <GridItem w="100%" h="300">
                  <Card w="full" h="full" rounded={20} overflow="hidden">
                    <Skeleton w="full" h="full" opacity={1} />
                  </Card>
                </GridItem>
                <GridItem w="100%" h="300">
                  <Card w="full" h="full" rounded={20} overflow="hidden">
                    <Skeleton w="full" h="full" opacity={1} />
                  </Card>
                </GridItem>
                <GridItem w="100%" h="300">
                  <Card w="full" h="full" rounded={20} overflow="hidden">
                    <Skeleton w="full" h="full" opacity={1} />
                  </Card>
                </GridItem>
                <GridItem w="100%" h="300">
                  <Card w="full" h="full" rounded={20} overflow="hidden">
                    <Skeleton w="full" h="full" opacity={1} />
                  </Card>
                </GridItem>
                <GridItem w="100%" h="300">
                  <Card w="full" h="full" rounded={20} overflow="hidden">
                    <Skeleton w="full" h="full" opacity={1} />
                  </Card>
                </GridItem>
                <GridItem w="100%" h="300">
                  <Card w="full" h="full" rounded={20} overflow="hidden">
                    <Skeleton w="full" h="full" opacity={1} />
                  </Card>
                </GridItem>
              </Grid>
            )}
          </VStack>
        </Container>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} size="3xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Score transition</ModalHeader>
          <ModalCloseButton />
          <ModalBody h="70vh">
            {ratingData == undefined ? (
              <Center w="full" h="full">
                <Spinner />
              </Center>
            ) : (
              <Line
                data={{
                  labels: ratingData.ratingUpdateds.map((r) =>
                    new Date(r.blockTimestamp * 1000).toLocaleDateString(
                      'en-US',
                      { hour: 'numeric', minute: 'numeric' }
                    )
                  ),
                  datasets: [
                    {
                      label: 'Score',
                      data: ratingData.ratingUpdateds.map((r) => r.newRating),
                      borderColor: '#546EF3',
                      backgroundColor: '#546EF3'
                    }
                  ]
                }}
                options={{
                  interaction: {
                    mode: 'index' as const,
                    intersect: false
                  }
                }}
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
