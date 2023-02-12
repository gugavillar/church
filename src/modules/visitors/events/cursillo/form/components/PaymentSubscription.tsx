import { useFormContext } from 'react-hook-form'

import { CardBody, Button, CardFooter, Flex, Box, Select } from '@chakra-ui/react'

import { FieldController, IfComponent, CardTitle } from '@common/components'

import { PaymentMethods } from '@common/@types'
import { PAYMENT_METHODS } from '@common/constants'

import { NewCursilhistForm } from './Form'
import { PaymentExplanation } from './payments/PaymentExplanation'

type PaymentDataProps = {
  handleNextStep: () => void
  handlePrevStep: () => void
}

export const PaymentData = ({ handlePrevStep }: PaymentDataProps) => {
  const {
    register,
    watch,
    formState: { errors, isSubmitting, isDirty, isValid }
  } = useFormContext<NewCursilhistForm>()
  const payment = watch('paymentMethod')

  return (
    <CardTitle
      title='Inscrição'
      subtitle='Escolha a forma de pagamento'
    >
      <CardBody pt={0}>
        <Flex
          direction={['column', 'row']}
          align='flex-start'
        >
          <Box w={['full', '27.5rem']}>
            <FieldController
              label='Qual a forma de pagamento?'
              error={errors?.paymentMethod?.message as string}
            >
              <Select
                {...register('paymentMethod')}
                placeholder='Selecione uma opção'
              >
                {PAYMENT_METHODS.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </Select>
            </FieldController>
          </Box>
        </Flex>
        <Flex
          align='center'
          mt={8}
        >
          <IfComponent
            conditional={Boolean(payment)}
            component={<PaymentExplanation payment={payment as PaymentMethods} />}
          />
        </Flex>
      </CardBody>
      <CardFooter>
        <Flex
          align='center'
          justify='flex-end'
          gap={6}
          width='full'
        >
          <Button
            variant='outline'
            onClick={handlePrevStep}
          >
            Voltar
          </Button>
          <Button
            type='submit'
            isLoading={isSubmitting}
            isDisabled={!isDirty || !isValid}
          >
            Finalizar
          </Button>
        </Flex>
      </CardFooter>
    </CardTitle>
  )
}
