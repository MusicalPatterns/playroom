import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { ImmutableRootState, RootStateKeys, SidePanelPropsFromState } from '../../root'
import { handleHamburger } from '../events'
import { PatternStateKeys } from '../state'
import { HamburgerProps, HamburgerPropsFromDispatch } from './types'

const mapStateToProps: (state: ImmutableRootState) => SidePanelPropsFromState =
    (state: ImmutableRootState): SidePanelPropsFromState => ({
        sidePanelOpen: state.get(RootStateKeys.PATTERN)
            .get(PatternStateKeys.SIDE_PANEL_OPEN),
    })

const mapDispatchToProps: (dispatch: Dispatch) => HamburgerPropsFromDispatch =
    (dispatch: Dispatch): HamburgerPropsFromDispatch => ({
        hamburgerHandler: (sidePanelOpen: boolean): void => {
            handleHamburger({ dispatch, sidePanelOpen })
        },
    })

const Hamburger: (props: HamburgerProps) => JSX.Element =
    ({ hamburgerHandler, sidePanelOpen }: HamburgerProps): JSX.Element => {
        const onClick: VoidFunction = (): void => {
            hamburgerHandler(sidePanelOpen)
        }

        return (
            <button {...{ id: 'hamburger', onClick }}>
                <FontAwesomeIcon {...{ icon: faBars }}/>
            </button>
        )
    }

export default connect(mapStateToProps, mapDispatchToProps)(Hamburger)
