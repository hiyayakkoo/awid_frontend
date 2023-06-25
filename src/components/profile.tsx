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
  useColorMode
} from '@chakra-ui/react'
import { FC, useEffect, useMemo, useRef, useState } from 'react'
import { Landscape, Edit, Groups, Insights } from '@mui/icons-material'
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

  return (
    <Box
      backgroundImage={'/images/header-lg.png'}
      backgroundSize="contain"
      backgroundRepeat={'no-repeat'}
      w="full"
    >
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
                    <CardBody>
                      <VStack>
                        <VStack>
                          <Text>{game.name}</Text>
                          <HStack>
                            <Icon as={Insights} />
                            <Text fontSize="2xl" fontWeight="bold">
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
  )
}
