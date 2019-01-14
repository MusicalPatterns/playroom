import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { handleHamburger } from '../events'
import { HamburgerProps, HamburgerPropsFromDispatch } from './types'

const mapDispatchToProps: (dispatch: Dispatch) => HamburgerPropsFromDispatch =
    (dispatch: Dispatch): HamburgerPropsFromDispatch => ({
        hamburgerHandler: (patternsPanelOpen: boolean): void => {
            handleHamburger({ dispatch, patternsPanelOpen })
        },
    })

const Hamburger: (props: HamburgerProps) => JSX.Element =
    ({ hamburgerHandler, patternsPanelOpen }: HamburgerProps): JSX.Element => (
        <button {...{
            id: 'hamburger',
            onClick: (): void => {
                hamburgerHandler(patternsPanelOpen)
            },
        }}>
            <FontAwesomeIcon {...{ icon: faBars }}/>
        </button>
    )

export default connect(undefined, mapDispatchToProps)(Hamburger)
