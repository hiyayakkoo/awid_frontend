'use client'

import {
  Box,
  HStack,
  VStack,
  Text,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  NumberInput,
  useColorModeValue,
  NumberInputField,
  Image,
  useColorMode
} from '@chakra-ui/react'
import { FC, useState } from 'react'
import { SismoConnect } from './sismoConnect'

export const Top: FC<{}> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [accountNumber, setAccountNumber] = useState<number>(1)

  const modalBg = useColorModeValue('white', 'black')
  const modalString = useColorModeValue('black', 'white')
  const { colorMode } = useColorMode()

  return (
    <>
      <Box>
        <HStack w="full" position="relative">
          {/* Content */}
          <VStack
            width="40%"
            justify="space-between"
            h="100vh"
            alignItems="start"
            p={10}
            pb={32}
          >
            <Box>
              <Image
                position="absolute"
                src={
                  colorMode == 'light'
                    ? '/images/logo-black.png'
                    : '/images/logo-white.png'
                }
                alt="logo"
                w="200px"
                top={10}
                left={5}
              />
            </Box>

            <VStack spacing={10} alignItems="start">
              <Text fontSize="3xl" fontWeight="bold">
                Integrate game identities with privacy and Show off your skills
                with attestation
              </Text>
              <HStack>
                <Button onClick={onOpen}>Start app</Button>
                <Button variant="ghost">Read the docs</Button>
              </HStack>
            </VStack>
          </VStack>
          {/* Image */}
          <Box
            height="100vh"
            width="60%"
            position="relative"
            backgroundImage={'/images/background.png'}
            backgroundSize="cover"
          ></Box>
        </HStack>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bgColor={modalBg} color={modalString} p={8}>
          <ModalHeader>Register with Sismo</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack w="full" alignItems="start">
              <Text>How many accounts do you want to link to AWID?</Text>
              <NumberInput
                onChange={(_, value) => {
                  setAccountNumber(value)
                }}
                min={1}
                max={20}
                defaultValue={1}
                w="full"
              >
                <NumberInputField />
              </NumberInput>
            </VStack>
          </ModalBody>

          <VStack spacing={4}>
            <Box>
              <SismoConnect authNum={accountNumber} />
            </Box>

            <Text fontSize="xl" fontWeight="bold">
              OR
            </Text>

            <Box>
              <SismoConnect authNum={0} />
            </Box>
          </VStack>
        </ModalContent>
      </Modal>
    </>
  )
}
