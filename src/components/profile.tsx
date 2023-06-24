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
  IconButton
} from '@chakra-ui/react'
import { FC } from 'react'
import { Edit, Groups, Insights } from '@mui/icons-material'

type Props = {
  id: string
}

export const Profile: FC<Props> = ({ id }) => {
  // TODO: get cid from contract by id
  const cid = 'bafybeifoi6vkbk5zamfeptots5hlnrt5glo34qgbsaewjbicv7zifefi34'

  return (
    <Box
      backgroundImage={'/images/header-lg.png'}
      backgroundSize="contain"
      backgroundRepeat={'no-repeat'}
      w="full"
    >
      <Container maxW="container.lg" py={20} px={10}>
        <VStack
          h="100vh"
          backgroundColor="gray.200"
          borderRadius={20}
          shadow="xl"
          position="relative"
          mt={20}
          py={10}
          px={8}
        >
          <Avatar
            size="xl"
            borderWidth={3}
            borderColor="white"
            position="absolute"
            top={-16}
          />
          <Text
            fontSize="3xl"
            py={6}
            fontWeight="bold"
            color="black"
            position="relative"
          >
            Vitalik Buterin
            <IconButton
              icon={<Icon as={Edit} />}
              aria-label="edit"
              position="absolute"
              right={-12}
              variant="unstyled"
              pt={3}
            />
          </Text>

          <Grid templateColumns="repeat(3, 1fr)" gap={6} w="full">
            <GridItem w="100%" h="300">
              <Card w="full" h="full" rounded={20} overflow="hidden">
                <Box
                  h="60%"
                  overflow="hidden"
                  backgroundImage="/images/try-yours-luck.jpg" // TODO: fix
                  backgroundSize="cover"
                  backgroundPosition="center"
                />
                <CardBody>
                  <VStack>
                    <VStack>
                      <Text>Try your&apos;s luck</Text>
                      <Text fontSize="2xl" color="red.500" fontWeight="bold">
                        Top 1%
                      </Text>
                    </VStack>

                    <Divider />
                    <HStack spacing={6}>
                      <HStack>
                        <Icon as={Insights} />
                        <Text fontSize="lg" fontWeight="bold">
                          8,000
                        </Text>
                      </HStack>
                      <HStack>
                        <Icon as={Groups} />
                        <Text fontSize="lg" fontWeight="bold">
                          200
                        </Text>
                      </HStack>
                    </HStack>
                  </VStack>
                </CardBody>
              </Card>
            </GridItem>
          </Grid>
        </VStack>
      </Container>
    </Box>
  )
}
