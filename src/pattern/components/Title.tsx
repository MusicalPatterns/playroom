import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { WithClickHandler } from '../../types'
import { buildTitleClickHandler } from '../events'
// @ts-ignore
import SymbolSvg from './symbol.svg'

const mapDispatchToProps: (dispatch: Dispatch) => WithClickHandler =
    (dispatch: Dispatch): WithClickHandler => ({
        onClick: buildTitleClickHandler({ dispatch }),
    })

const Title: (props: WithClickHandler) => JSX.Element =
    ({ onClick }: WithClickHandler): JSX.Element => (
        <div {...{ id: 'title' }}>
            <div {...{ onClick }}>
                <SymbolSvg/>
            </div>
            <div>
                <h1 {...{ onClick }}>Musical Patterns</h1>
                <div><a {...{ href: 'https://douglasblumeyer.com', target: '__blank' }}>Douglas Blumeyer</a></div>
            </div>
        </div>
    )

export default connect(undefined, mapDispatchToProps)(Title)
