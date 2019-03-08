// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect

import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { EventHandler, ImmutableState, StateKey } from '../../../types'
import { PageStateKey } from '../../types'
import { handleTitleClick } from './events'
import './styles'
// @ts-ignore
// tslint:disable-next-line no-default-import
import SymbolSvg from './symbol.svg'
import { TitleClickEventParameters, TitleProps, TitlePropsFromDispatch, TitlePropsFromState } from './types'

const mapStateToProps: (state: ImmutableState) => TitlePropsFromState =
    (state: ImmutableState): TitlePropsFromState => ({
        rightColumnOpen: state.get(StateKey.PAGE)
            .get(PageStateKey.RIGHT_COLUMN_OPEN),
    })

const mapDispatchToProps: (dispatch: Dispatch) => TitlePropsFromDispatch =
    (dispatch: Dispatch): TitlePropsFromDispatch => ({
        handleTitleClickEvent: async (titleClickEventParameters: TitleClickEventParameters): Promise<void> => {
            await handleTitleClick({ dispatch, titleClickEventParameters })
        },
    })

const Title: React.ComponentType<TitleProps> =
    ({ handleTitleClickEvent, rightColumnOpen }: TitleProps): JSX.Element => {
        const onClick: EventHandler = (event: React.SyntheticEvent): void => {
            handleTitleClickEvent({ event, rightColumnOpen })
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

export default connect(mapStateToProps, mapDispatchToProps)(Title)
