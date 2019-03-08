// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect

import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { ImmutableState, StateKey } from '../../types'
import { PageStateKey } from '../types'
import { handleHamburger } from './events'
import './styles'
import { HamburgerProps, HamburgerPropsFromDispatch, HamburgerPropsFromState } from './types'

const mapStateToProps: (state: ImmutableState) => HamburgerPropsFromState =
    (state: ImmutableState): HamburgerPropsFromState => ({
        leftColumnOpen: state.get(StateKey.PAGE)
            .get(PageStateKey.LEFT_COLUMN_OPEN),
    })

const mapDispatchToProps: (dispatch: Dispatch) => HamburgerPropsFromDispatch =
    (dispatch: Dispatch): HamburgerPropsFromDispatch => ({
        hamburgerHandler: (leftColumnOpen: boolean): void => {
            handleHamburger({ dispatch, leftColumnOpen })
        },
    })

const Hamburger: React.ComponentType<HamburgerProps> =
    ({ hamburgerHandler, leftColumnOpen }: HamburgerProps): JSX.Element => {
        const onClick: VoidFunction = (): void => {
            hamburgerHandler(leftColumnOpen)
        }

        return (
            <button {...{ id: 'hamburger', onClick }}>
                <FontAwesomeIcon {...{ icon: faBars }}/>
            </button>
        )
    }

export default connect(mapStateToProps, mapDispatchToProps)(Hamburger)
