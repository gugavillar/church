import { Fragment } from 'react'

import { IfComponent, LoaderPage } from '@common/components'

import { useRouterChange } from '@common/hooks'

type BodyLayoutProps = {
  children: JSX.Element
}

export const BodyLayout = ({ children }: BodyLayoutProps) => {
  const isChanging = useRouterChange()
  return (
    <Fragment>
      <IfComponent
        conditional={isChanging}
        component={<LoaderPage />}
      />
      <IfComponent
        conditional={!isChanging}
        component={children}
      />
    </Fragment>
  )
}
