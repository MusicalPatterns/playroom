// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect no-null-keyword

import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { EventHandler, ImmutableState, StateKey } from '../../../types'
import { PageStateKey } from '../../types'
import { handleLogoClick } from './events'
import './styles'
// @ts-ignore
// tslint:disable-next-line no-default-import
import SymbolSvg from './symbol.svg'
import { HandleLogoClickEventParameters, LogoProps, LogoPropsFromDispatch, LogoPropsFromState } from './types'

const mapStateToProps: (state: ImmutableState) => LogoPropsFromState =
    (state: ImmutableState): LogoPropsFromState => ({
        rightColumnOpen: state.get(StateKey.PAGE)
            .get(PageStateKey.RIGHT_COLUMN_OPEN),
    })

const mapDispatchToProps: (dispatch: Dispatch) => LogoPropsFromDispatch =
    (dispatch: Dispatch): LogoPropsFromDispatch => ({
        handleLogoClickEvent: async (logoClickEventParameters: HandleLogoClickEventParameters): Promise<void> => {
            await handleLogoClick({ dispatch, ...logoClickEventParameters })
        },
    })

const Logo: React.ComponentType<LogoProps> =
    ({ handleLogoClickEvent, rightColumnOpen }: LogoProps): React.ReactElement | null => {
        const onClick: EventHandler = (event: React.SyntheticEvent): void => {
            handleLogoClickEvent({ event, rightColumnOpen })
        }

        return (
            <div {...{ id: 'logo' }}>
                <div {...{ onClick }}>
                    <SymbolSvg/>
                </div>
                <div>
                    <h1 {...{ onClick }}>Musical Patterns</h1>
                    <div><a {...{ href: 'https://douglasblumeyer.com', target: '__blank' }}>Douglas Blumeyer</a></div>
                </div>
                <div id='bravura-text-test'>---</div>
            </div>
        )
    }

export default connect(mapStateToProps, mapDispatchToProps)(Logo)
