// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect no-null-keyword

import { faCaretDown, faCaretRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { CONTROLS } from '../../../../copy'
import { ImmutableState, StateKey } from '../../../../types'
import { PatternStateKey } from '../../../types'
import { SpecStateKey } from '../../types'
import { SpecPanelOpenParameter } from '../types'
import { handleSpecPanelHeaderClick } from './events'
import './styles'
import { SpecPanelHeaderProps, SpecPanelHeaderPropsFromDispatch } from './types'

const mapStateToProps: (state: ImmutableState) => SpecPanelOpenParameter =
    (state: ImmutableState): SpecPanelOpenParameter => ({
        specPanelOpen: state.get(StateKey.PATTERN)
            .get(PatternStateKey.SPEC)
            .get(SpecStateKey.SPEC_PANEL_OPEN),
    })

const mapDispatchToProps: (dispatch: Dispatch) => SpecPanelHeaderPropsFromDispatch =
    (dispatch: Dispatch): SpecPanelHeaderPropsFromDispatch => ({
        handleSpecPanelHeaderClickEvent: ({ specPanelOpen }: SpecPanelOpenParameter): void => {
            handleSpecPanelHeaderClick({ dispatch, specPanelOpen })
        },
    })

const SpecPanelHeader: React.ComponentType<SpecPanelHeaderProps> =
    ({ handleSpecPanelHeaderClickEvent, specPanelOpen }: SpecPanelHeaderProps): React.ReactElement | null => {
        const onClick: VoidFunction = (): void => {
            handleSpecPanelHeaderClickEvent({ specPanelOpen })
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
