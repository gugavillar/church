import { Flex, Spinner, Text } from '@chakra-ui/react'

export const LoaderPage = () => {
  return (
    <Flex
      align='center'
      justify='center'
      width='full'
      height='calc(100vh - 10rem)'
      gap={4}
    >
      <Spinner
        size='xl'
        color='gray.500'
        thickness='4px'
      />
      <Text fontSize='sm'>Carregando...</Text>
    </Flex>
  )
}
