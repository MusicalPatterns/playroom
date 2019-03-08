// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect

import { faCaretDown, faCaretRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { CONTROLS } from '../../../copy'
import { EventHandler, ImmutableState, StateKey } from '../../../types'
import { SpecStateKey } from '../../types'
import { SpecPanelOpenAsProp } from '../types'
import { caretClickHandler } from './events'
import './styles'
import { CaretClickEventParameters, SpecPanelHeaderProps, SpecPanelHeaderPropsFromDispatch } from './types'

const mapStateToProps: (state: ImmutableState) => SpecPanelOpenAsProp =
    (state: ImmutableState): SpecPanelOpenAsProp => ({
        specPanelOpen: state.get(StateKey.SPEC)
            .get(SpecStateKey.SPEC_PANEL_OPEN),
    })

const mapDispatchToProps: (dispatch: Dispatch) => SpecPanelHeaderPropsFromDispatch =
    (dispatch: Dispatch): SpecPanelHeaderPropsFromDispatch => ({
        handleCaretClickEvent: ({ event, specPanelOpen }: CaretClickEventParameters): void => {
            caretClickHandler({ dispatch, specPanelOpen })
        },
    })

const SpecPanelHeader: React.ComponentType<SpecPanelHeaderProps> =
    ({ handleCaretClickEvent, specPanelOpen }: SpecPanelHeaderProps): JSX.Element => {
        const onClick: EventHandler =
            (event: React.SyntheticEvent): void => {
                handleCaretClickEvent({ event, specPanelOpen })
            }

        return (
            <h3 {...{ id: 'spec-panel-header', onClick }}>
                {CONTROLS}
                <button {...{ id: 'caret', onClick }}>
                    <FontAwesomeIcon {...{ icon: specPanelOpen ? faCaretDown : faCaretRight }}/>
                </button>
            </h3>
        )
    }

export default connect(mapStateToProps, mapDispatchToProps)(SpecPanelHeader)
