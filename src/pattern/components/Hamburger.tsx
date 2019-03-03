import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { ImmutableRootState, RootStateKeys } from '../../root'
import { handleHamburger } from '../events'
import { PatternStateKeys } from '../state'
import { HamburgerProps, HamburgerPropsFromDispatch, HamburgerPropsFromState } from './types'

const mapStateToProps: (state: ImmutableRootState) => HamburgerPropsFromState =
    (state: ImmutableRootState): HamburgerPropsFromState => ({
        leftColumnOpen: state.get(RootStateKeys.PATTERN)
            .get(PatternStateKeys.LEFT_COLUMN_OPEN),
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
