// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect no-null-keyword

import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { EventHandler, ImmutableState, StateKey } from '../../../../types'
import { PatternStateKey } from '../../../types'
import { ImmutableSpecState, SpecStateKey, SubmissionProps } from '../../types'
import { handleFieldAdd } from './events'
import './styles'
import { AddFieldButtonProps, AddFieldButtonPropsFromDispatch, HandleFieldAddEventParameters } from './types'

const mapStateToProps: (state: ImmutableState) => SubmissionProps =
    (state: ImmutableState): SubmissionProps => {
        const specState: ImmutableSpecState = state.get(StateKey.PATTERN)
            .get(PatternStateKey.SPEC)

        return {
            computeValidations: specState.get(SpecStateKey.COMPUTE_VALIDATIONS),
            configurations: specState.get(SpecStateKey.CONFIGURATIONS),
            displayedSpecs: specState.get(SpecStateKey.DISPLAYED_SPECS),
            submittedSpecs: specState.get(SpecStateKey.SUBMITTED_SPECS),
        }
    }

const mapDispatchToProps: (dispatch: Dispatch) => AddFieldButtonPropsFromDispatch =
    (dispatch: Dispatch): AddFieldButtonPropsFromDispatch => ({
        handleFieldAddEvent: (handleFieldAddEventParameters: HandleFieldAddEventParameters): void => {
            handleFieldAdd({ dispatch, ...handleFieldAddEventParameters })
        },
    })

const AddFieldButton: React.ComponentType<AddFieldButtonProps> =
    (addFieldButtonProps: AddFieldButtonProps): React.ReactElement | null => {
        const { handleFieldAddEvent, ...otherProps } = addFieldButtonProps
        const onClick: EventHandler = (event: React.SyntheticEvent): void => {
            handleFieldAddEvent({ event, ...otherProps })
        }

        return (
            <button {...{ className: 'add-field', onClick }}>
                <FontAwesomeIcon {...{ icon: faPlus }}/>
            </button>
        )
    }

export default connect(mapStateToProps, mapDispatchToProps)(AddFieldButton)
