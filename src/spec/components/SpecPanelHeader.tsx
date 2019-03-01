import { faCaretDown, faCaretRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { CONTROLS } from '../../copy'
import { ImmutableRootState, RootStateKeys } from '../../root'
import { buildCaretClickHandler } from '../events'
import { SpecStateKeys } from '../state'
import { SpecPanelHeaderProps, SpecPanelHeaderPropsFromDispatch, SpecPanelOpenAsProp } from './types'

const mapStateToProps: (state: ImmutableRootState) => SpecPanelOpenAsProp =
    (state: ImmutableRootState): SpecPanelOpenAsProp => ({
        specPanelOpen: state.get(RootStateKeys.SPEC)
            .get(SpecStateKeys.SPEC_PANEL_OPEN),
    })

const mapDispatchToProps: (dispatch: Dispatch) => SpecPanelHeaderPropsFromDispatch =
    (dispatch: Dispatch): SpecPanelHeaderPropsFromDispatch => ({
        handleCaretClick: buildCaretClickHandler({ dispatch }),
    })

const SpecPanelHeader: (props: SpecPanelHeaderProps) => JSX.Element =
    ({ handleCaretClick, specPanelOpen }: SpecPanelHeaderProps): JSX.Element => (
        <h3 {...{ id: 'spec-panel-header' }}>
            {CONTROLS}
            <button {...{ id: 'caret', onClick: handleCaretClick }}>
                <FontAwesomeIcon {...{ icon: specPanelOpen ? faCaretDown : faCaretRight }}/>
            </button>
        </h3>
    )

export default connect(mapStateToProps, mapDispatchToProps)(SpecPanelHeader)