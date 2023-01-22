import { Flex, Box, Image, Text } from '@chakra-ui/react'

export const Footer = () => {
  return (
    <Flex
      position='absolute'
      bottom={0}
      align='center'
      width='full'
      gap={8}
    >
      <Box boxSize={48}>
        <Image
          src='/assets/logo-vida-red.png'
          alt='Logo igreja anglicana vida na cor vermelha'
        />
      </Box>
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
