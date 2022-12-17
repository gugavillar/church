import { Roboto_Condensed } from '@next/font/google'

const heading = Roboto_Condensed({
  weight: '700'
})

const body = Roboto_Condensed({
  weight: '400'
})

export const fonts = {
  fonts: {
    heading: heading.style.fontFamily,
    body: body.style.fontFamily
  },
  fontSizes: {
    xs: '1rem',
    sm: '1.5rem',
    md: '2rem',
    lg: '2.5rem',
    xl: '3rem',
    '2xl': '4rem'
  }
}
