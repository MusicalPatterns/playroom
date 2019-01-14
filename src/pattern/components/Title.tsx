// tslint:disable:no-unsafe-any

import * as React from 'react'
// @ts-ignore
import SymbolSvg from './symbol.svg'

const Title: () => JSX.Element =
    (): JSX.Element => (
        <div {...{ id: 'title' }}>
            <SymbolSvg/>
            <h1>Musical Patterns</h1>
            <div><a {...{ href: 'https://douglasblumeyer.com', target: '__blank' }}>Douglas Blumeyer</a></div>
        </div>
    )

export default Title
