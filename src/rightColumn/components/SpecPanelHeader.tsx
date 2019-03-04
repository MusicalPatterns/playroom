import { faCaretDown, faCaretRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { CONTROLS } from '../../copy'
import { ImmutableRootState, RootStateKey } from '../../root'
import { EventHandler } from '../../types'
import { CaretClickEventParameters, caretClickHandler } from '../events'
import { RightColumnStateKey } from '../state'
import { SpecPanelHeaderProps, SpecPanelHeaderPropsFromDispatch, SpecPanelOpenAsProp } from './types'

const mapStateToProps: (state: ImmutableRootState) => SpecPanelOpenAsProp =
    (state: ImmutableRootState): SpecPanelOpenAsProp => ({
        specPanelOpen: state.get(RootStateKey.RIGHT_COLUMN)
            .get(RightColumnStateKey.SPEC_PANEL_OPEN),
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
            <h3 {...{ id: 'spec-panel-header' }}>
                {CONTROLS}
                <button {...{ id: 'caret', onClick }}>
                    <FontAwesomeIcon {...{ icon: specPanelOpen ? faCaretDown : faCaretRight }}/>
                </button>
            </h3>
        )
    }

export default connect(mapStateToProps, mapDispatchToProps)(SpecPanelHeader)
