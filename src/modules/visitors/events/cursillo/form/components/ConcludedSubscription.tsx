import { useFormContext } from 'react-hook-form'

import { Card, CardHeader, CardBody, CardFooter, Button, Flex, Text } from '@chakra-ui/react'

import { PageSubtitle } from '@common/components'

import { PaymentMethods } from '@common/@types'

import { NewCursilhistForm } from '..'

const MESSAGE_PAYMENT = {
  credit: 'Estamos aguardando o retorno da operadora do cartão',
  money: 'Procure os responsáveis do financeiro para efetuar o pagamento',
  pix: 'Envie o comprovante para o telefone para que possamos confirmar o seu pagamento'
}

export const ConcludedSubscription = () => {
  const {
    getValues,
    formState: { isSubmitting }
  } = useFormContext<NewCursilhistForm>()
  const { paymentMethod } = getValues()
  return (
    <Card
      bg='transparent'
      boxShadow='2xl'
    >
      <CardHeader>
        <PageSubtitle>Inscrição confirmada</PageSubtitle>
      </CardHeader>
      <CardBody
        pt={0}
        fontSize={['xs', 'sm']}
      >
        <Text>Você finalizou o processo de inscrição</Text>
        <Text>{MESSAGE_PAYMENT[paymentMethod as PaymentMethods]}</Text>
        <Text>Esperamos você na quinta feira. Clique em finalizar para sair.</Text>
      </CardBody>
      <CardFooter>
        <Flex
          align='center'
          justify='flex-end'
          gap={6}
          width='full'
        >
          <Button
            type='submit'
            isLoading={isSubmitting}
          >
            Finalizar
          </Button>
        </Flex>
      </CardFooter>
    </Card>
  )
}
