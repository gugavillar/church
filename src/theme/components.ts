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
      background: 'primary',
      width: '11.375rem',
      ...defaultVariantProps,
      _hover: {
        background: 'primary_hover'
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
  variants: {
    defaultInput: {
      field: {
        border: 'none',
        borderRadius: '0.25rem',
        height: '4rem',
        padding: '1.25rem',
        fontSize: 'xs',
        lineHeight: '1.5rem',
        color: 'black',
        _placeholder: {
          color: 'black'
        }
      }
    }
  },
  defaultProps: {
    variant: 'defaultInput'
  }
})

export const Link = defineStyleConfig({
  baseStyle: {
    color: 'white',
    fontSize: 'xs',
    textTransform: 'uppercase',
    fontWeight: '400',
    lineHeight: '1.1719rem'
  },
  variants: {
    active: {
      color: 'primary',
      textDecoration: 'underline',
      fontWeight: '700'
    }
  }
})
