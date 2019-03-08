// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect

import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { EventHandler, ImmutableState, StateKey } from '../../../types'
import { ImmutableSpecState, SpecStateKey } from '../../types'
import { handleArrayedSpecControlAdd } from './events'
import { AddButtonProps, AddButtonPropsFromDispatch, AddButtonPropsFromState, HandleAddEventParameters } from './types'

const mapStateToProps: (state: ImmutableState) => AddButtonPropsFromState =
    (state: ImmutableState): AddButtonPropsFromState => {
        const specState: ImmutableSpecState = state.get(StateKey.SPEC)

        return {
            attributes: specState.get(SpecStateKey.ATTRIBUTES),
            displayedSpec: specState.get(SpecStateKey.DISPLAYED_SPEC),
            submittedSpec: specState.get(SpecStateKey.SUBMITTED_SPEC),
            validationFunction: specState.get(SpecStateKey.VALIDATION_FUNCTION),
        }
    }

const mapDispatchToProps: (dispatch: Dispatch) => AddButtonPropsFromDispatch =
    (dispatch: Dispatch): AddButtonPropsFromDispatch => ({
        handleAddEvent: (handleAddEventParameters: HandleAddEventParameters): void => {
            handleArrayedSpecControlAdd({ dispatch, ...handleAddEventParameters })
        },
    })

const AddButton: React.ComponentType<AddButtonProps> =
    (props: AddButtonProps): JSX.Element => {
        const { handleAddEvent, property, attributes, displayedSpec, submittedSpec, validationFunction } = props
        const onClick: EventHandler = (event: React.SyntheticEvent): void => {
            handleAddEvent({ event, property, attributes, displayedSpec, submittedSpec, validationFunction })
        }

        return (
            <button {...{ className: 'add', onClick }}>
                <FontAwesomeIcon {...{ icon: faPlus }}/>
            </button>
        )
    }

export default connect(mapStateToProps, mapDispatchToProps)(AddButton)
