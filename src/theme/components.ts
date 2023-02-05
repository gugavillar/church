import { defineStyleConfig } from '@chakra-ui/react'

const defaultVariantProps = {
  height: ['2rem', '4rem'],
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
      background: 'gray.500',
      width: ['10rem', '11.375rem'],
      color: 'white',
      ...defaultVariantProps,
      _hover: {
        opacity: 0.8,
        _disabled: {
          opacity: 0.4,
          bg: 'gray.400'
        }
      }
    },
    outline: {
      border: 'none',
      fontWeight: 400,
      textTransform: 'none',
      fontSize: ['1.3rem', '1.5rem'],
      py: 0,
      height: 'auto',
      _hover: {
        bg: 'transparent'
      }
    },
    secondary: {
      background: 'black',
      color: 'white',
      width: '13rem',
      ...defaultVariantProps,
      _hover: {
        opacity: 0.8,
        _disabled: {
          opacity: 0.4,
          bg: 'black'
        }
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
        height: ['2rem', '3rem'],
        border: 'none',
        fontSize: ['xs', 'sm'],
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
      textTransform: 'uppercase',
      color: 'white'
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

export const Select = defineStyleConfig({
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
        height: ['2.5rem', '3rem'],
        border: 'none',
        fontSize: ['xs', 'sm'],
        lineHeight: '1.5rem',
        bg: 'white',
        borderRadius: '0.25rem'
      }
    }
  },
  defaultProps: {
    variant: 'outline'
  }
})

export const Textarea = defineStyleConfig({
  baseStyle: {
    _placeholder: {
      color: 'black'
    },
    color: 'black'
  },
  variants: {
    outline: {
      height: [24, 32],
      border: 'none',
      fontSize: ['xs', 'sm'],
      lineHeight: '1.5rem',
      padding: '1.25rem',
      bg: 'white',
      borderRadius: '0.25rem'
    }
  },
  defaultProps: {
    variant: 'outline'
  }
})

export const Radio = defineStyleConfig({
  baseStyle: {
    control: {
      color: 'gray.900',
      borderColor: 'gray.900',
      width: 5,
      height: 5,
      _checked: {
        background: 'gray.900',
        borderColor: 'gray.900',
        color: 'white'
      }
    },
    container: {
      height: '3rem'
    }
  },
  sizes: {
    md: {
      label: {
        fontSize: ['1rem', '1.5rem']
      }
    }
  }
})
