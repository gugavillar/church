type IfComponentProps = {
  component: JSX.Element
  conditional: boolean
}
export const IfComponent = ({ component, conditional }: IfComponentProps) => {
  if (conditional) return component
  return null
}
