import { Flex, Box, Text } from '@chakra-ui/react'

import { LogoRed } from './LogoRed'

export const Footer = () => {
  return (
    <Flex
      position='absolute'
      bottom={0}
      align='center'
      gap={8}
    >
      <LogoRed />
      <Box>
        <Text>Igreja Anglicana Vida - Gravatá</Text>
        <Box as='address'>
          <Text>Endereço: </Text>
          <Text>Telefone:</Text>
          <Text>E-mail:</Text>
        </Box>
      </Box>
    </Flex>
  )
}
