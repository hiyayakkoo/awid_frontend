'use client'

import { Box, HStack, VStack, Text, Button } from '@chakra-ui/react'
import { FC } from 'react'
import { SismoConnect } from './sismoConnect'

export const Top: FC<{}> = () => {
  return (
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
          <VStack spacing={10}>
            <Text fontSize="xl" fontWeight="bold">
              Help Bring Clean and Safe Water to Every Person on the Pplanet
            </Text>
            <HStack>
              <SismoConnect />
              <Button>Read the docs</Button>
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
  )
}
