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
    <Text fontWeight={700}>{label}</Text>
    <Text>{data}</Text>
  </Flex>
)
