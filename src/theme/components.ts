import { defineStyleConfig } from '@chakra-ui/react'

const defaultVariantProps = {
  height: '4rem',
  fontSize: 'xs',
  fontWeight: '400',
  lineHeight: '1rem'
}

export const Button = defineStyleConfig({
  baseStyle: {
    padding: '1.5rem 4rem',
    display: 'flex',
    flexDirection: 'row',
    gap: '1rem',
    alignItems: 'center',
    borderRadius: '0.75rem',
    textTransform: 'uppercase'
  },
  variants: {
    primary: {
      background: 'white',
      width: '11.375rem',
      ...defaultVariantProps,
      _hover: {
        background: 'whiteAlpha.800'
      }
    },
    secondary: {
      background: 'black',
      color: 'primary',
      width: '13rem',
      ...defaultVariantProps,
      _hover: {
        color: 'white'
      }
    }
  },
  defaultProps: {
    variant: 'primary'
  }
})

export const Input = defineStyleConfig({
  baseStyle: {
    field: {
      _placeholder: {
        color: 'black'
      },
      color: 'black'
    }
  },
  variants: {
    outline: {
      field: {
        height: '4rem',
        border: 'none',
        fontSize: 'sm',
        lineHeight: '1.5rem',
        padding: '1.25rem',
        bg: 'white',
        borderRadius: '0.25rem'
      }
    }
  },
  defaultProps: {
    variant: 'outline'
  }
})

export const Text = defineStyleConfig({
  variants: {
    active: {
      textDecoration: 'underline',
      fontWeight: '700',
      textTransform: 'uppercase'
    },
    navLink: {
      color: 'white',
      fontSize: 'xs',
      textTransform: 'uppercase',
      fontWeight: '400',
      lineHeight: '1.1719rem'
    }
  }
})
