import { Flex, Text } from '@chakra-ui/react'

type ExhibitionDataProps = {
  label: string
  data: string | undefined
}

export const ExhibitionData = ({ data, label }: ExhibitionDataProps) => (
  <Flex
    gap={2}
    mt={2}
  >
    <Text
      fontSize={{ base: 'xs', md: 'sm', lg: 'sm' }}
      fontWeight={700}
    >
      {label}
    </Text>
    <Text fontSize={{ base: 'xs', md: 'sm', lg: 'sm' }}>{data}</Text>
  </Flex>
)
