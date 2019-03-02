import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { EventHandler } from '../../types'
import { handleTitleClick, TitleClickEventParameters } from '../events'
// @ts-ignore
import SymbolSvg from './symbol.svg'
import { TitleProps, TitlePropsFromDispatch } from './types'

const mapDispatchToProps: (dispatch: Dispatch) => TitlePropsFromDispatch =
    (dispatch: Dispatch): TitlePropsFromDispatch => ({
        handleTitleClickEvent: async (titleClickEventParameters: TitleClickEventParameters): Promise<void> => {
            await handleTitleClick({ dispatch, titleClickEventParameters })
        },
    })

const Title: (props: TitleProps) => JSX.Element =
    ({ handleTitleClickEvent, rightPanelOpen }: TitleProps): JSX.Element => {
        const onClick: EventHandler =
            (event: React.SyntheticEvent): void => {
                handleTitleClickEvent({ event, rightPanelOpen })
            }

        return (
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
    }

export default connect(undefined, mapDispatchToProps)(Title)
