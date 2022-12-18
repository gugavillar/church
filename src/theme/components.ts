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
    borderRadius: '0.75rem'
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
        fontSize: '1rem',
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
