import { format } from 'date-fns'

import { Text, OrderedList, ListItem, Flex, Box, VStack } from '@chakra-ui/react'

import { ptBR } from '@common/utils'

export const CursilloFormInstructions = () => {
  const today = format(new Date(), "dd 'de' MMMM 'de' yyyy", {
    locale: ptBR
  })
  return (
    <Box mb={8}>
      <Text
        fontWeight={700}
        color='red.500'
        textAlign='center'
        mb={3}
      >
        LEIA COM ATENÇÃO ESTAS OBSERVAÇÕES, SÓ DEPOIS PREENCHA O FORMULÁRIO
      </Text>
      <OrderedList
        maxW='85%'
        mx='auto'
      >
        <ListItem>
          O Cursilho destina-se a pessoas capazes de captar a mensagem cristã e comprometer-se com ela; Ser fermento do
          Evangelho em seus ambientes; Descobrir seus dons e colocá-los a serviço da comunidade; Demonstrar inquietação
          social;
        </ListItem>
        <ListItem>
          O preenchimento deste formulário implica na aceitação imediata e consequente participação, que acontecerá de{' '}
          {today}
        </ListItem>
        <ListItem>
          Haverá transporte saindo das igrejas na quinta-feira, confirme com quem lhe convidou o horário exato da saída.
          O evento ocorrerá no {process.env.NEXT_PUBLIC_CURSILLO_PLACE}, no qual devido a dinâmica o participante não
          deverá se ausentar até o domingo.
        </ListItem>
        <ListItem>
          Se você deseja mesmo participar deste movimento, deve preencher todos os campos deste formulário. O pagamento
          pode ser efetuado na igreja por você ou por quem lhe convidou, podendo ser a vista ou dividido em até 3 vezes
          no cartão (há adicional de juros se parcelado no cartão - procure o secretariado para efetuar o pagamento)
        </ListItem>
        <ListItem>
          Favor leve seu próprio material de higiene pessoal (escova de dentes, creme dental, sabonete), cobertor de
          forro de cama, toalhas de banho, remédios habituais, agasalho, evite shorts, bermudas, camisetas, roupas
          incompatíveis com os momentos que ali serão vividos
        </ListItem>
        <ListItem>
          Todas as igrejas participantes deste evento terá o prazer em receber sua família no culto de encerramento que
          acontecerá no DOMINGO, antes de viajar procure informações a respeito do horário para avisar os seus
          familiares e amigos.
        </ListItem>
      </OrderedList>
      <Flex
        justify='space-between'
        color='red'
        mt={4}
        fontWeight={700}
        direction={{ base: 'column', md: 'column', lg: 'row' }}
        maxW='80%'
        mx='auto'
        gap={{ base: 4, md: 4 }}
      >
        <VStack spacing={1}>
          <Text>Igreja participante: Anglicana Vida - Gravatá</Text>
          <Text>Informações: Inaldo Queiroz</Text>
        </VStack>
        <VStack spacing={1}>
          <Text>Igreja participante: Anglicana Vida - Bezerros</Text>
          <Text>Informações: Sandro</Text>
        </VStack>
      </Flex>
    </Box>
  )
}
