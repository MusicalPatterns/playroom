import * as React from 'react'
import { ConnectedComponentClass } from 'react-redux'

type ConnectedComponent<PropsType> = ConnectedComponentClass<React.FunctionComponent<PropsType>, Pick<PropsType, never>>

export {
    ConnectedComponent,
}
