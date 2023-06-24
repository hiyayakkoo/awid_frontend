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
  NumberInputField
} from '@chakra-ui/react'
import { FC, useState } from 'react'
import { SismoConnect } from './sismoConnect'

export const Top: FC<{}> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [accountNumber, setAccountNumber] = useState<number>(1)

  const modalBg = useColorModeValue('white', 'black')
  const modalString = useColorModeValue('black', 'white')

  return (
    <>
      <Box>
        <HStack w="full">
          {/* Content */}
          <VStack
            width="40%"
            justify="space-between"
            h="100vh"
            alignItems="start"
            p={10}
            pb={32}
          >
            <Text>Autonomous World ID</Text>
            <VStack spacing={10} alignItems="start">
              <Text fontSize="xl" fontWeight="bold">
                Help Bring Clean and Safe Water to Every Person on the Pplanet
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
