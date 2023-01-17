import { Flex, Spinner } from '@chakra-ui/react'

export const LoaderPage = () => {
  return (
    <Flex
      align='center'
      justify='center'
      width='full'
      height='calc(100vh - 10rem)'
    >
      <Spinner
        size='xl'
        color='gray.500'
      />
    </Flex>
  )
}
