import { ChakraProvider } from '@chakra-ui/react'

import { Layout } from '@common/components'

import { theme } from '../theme'

import type { AppProps } from 'next/app'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  )
}
