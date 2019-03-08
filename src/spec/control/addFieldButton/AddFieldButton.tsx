// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect

import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { EventHandler, ImmutableState, StateKey } from '../../../types'
import { ImmutableSpecState, SpecStateKey } from '../../types'
import { handleFieldAdd } from './events'
import {
    AddFieldButtonProps,
    AddFieldButtonPropsFromDispatch,
    AddFieldButtonPropsFromState,
    HandleFieldAddEventParameters,
} from './types'

const mapStateToProps: (state: ImmutableState) => AddFieldButtonPropsFromState =
    (state: ImmutableState): AddFieldButtonPropsFromState => {
        const specState: ImmutableSpecState = state.get(StateKey.SPEC)

        return {
            attributes: specState.get(SpecStateKey.ATTRIBUTES),
            displayedSpec: specState.get(SpecStateKey.DISPLAYED_SPEC),
            submittedSpec: specState.get(SpecStateKey.SUBMITTED_SPEC),
            validationFunction: specState.get(SpecStateKey.VALIDATION_FUNCTION),
        }
    }

const mapDispatchToProps: (dispatch: Dispatch) => AddFieldButtonPropsFromDispatch =
    (dispatch: Dispatch): AddFieldButtonPropsFromDispatch => ({
        handleFieldAddEvent: (handleFieldAddEventParameters: HandleFieldAddEventParameters): void => {
            handleFieldAdd({ dispatch, ...handleFieldAddEventParameters })
        },
    })

const AddFieldButton: React.ComponentType<AddFieldButtonProps> =
    (props: AddFieldButtonProps): JSX.Element => {
        const { handleFieldAddEvent, property, attributes, displayedSpec, submittedSpec, validationFunction } = props
        const onClick: EventHandler = (event: React.SyntheticEvent): void => {
            handleFieldAddEvent({
                attributes,
                displayedSpec,
                event,
                property,
                submittedSpec,
                validationFunction,
            })
        }

        return (
            <button {...{ className: 'add', onClick }}>
                <FontAwesomeIcon {...{ icon: faPlus }}/>
            </button>
        )
    }

export default connect(mapStateToProps, mapDispatchToProps)(AddFieldButton)
