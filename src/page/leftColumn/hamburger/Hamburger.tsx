// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect no-null-keyword

import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { ImmutableState, StateKey } from '../../../types'
import { PageStateKey } from '../../types'
import { handleHamburgerClick } from './events'
import './styles'
import { HamburgerProps, HamburgerPropsFromDispatch, HamburgerPropsFromState } from './types'

const mapStateToProps: (state: ImmutableState) => HamburgerPropsFromState =
    (state: ImmutableState): HamburgerPropsFromState => ({
        leftColumnOpen: state.get(StateKey.PAGE)
            .get(PageStateKey.LEFT_COLUMN_OPEN),
    })

const mapDispatchToProps: (dispatch: Dispatch) => HamburgerPropsFromDispatch =
    (dispatch: Dispatch): HamburgerPropsFromDispatch => ({
        handleHamburgerClickEvent: ({ leftColumnOpen }: HamburgerPropsFromState): void => {
            handleHamburgerClick({ dispatch, leftColumnOpen })
        },
    })

const Hamburger: React.ComponentType<HamburgerProps> =
    ({ handleHamburgerClickEvent, leftColumnOpen }: HamburgerProps): React.ReactElement | null => {
        const onClick: VoidFunction = (): void => {
            handleHamburgerClickEvent({ leftColumnOpen })
        }

        return (
            <button {...{ id: 'hamburger', onClick }}>
                <FontAwesomeIcon {...{ icon: faBars }}/>
            </button>
        )
    }

export default connect(mapStateToProps, mapDispatchToProps)(Hamburger)
