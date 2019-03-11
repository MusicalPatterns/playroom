// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect no-null-keyword

import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { ImmutableState, StateKey } from '../../../types'
import { ImmutableSpecState, SpecStateKey } from '../../types'
import { computeHandleFieldChangeEvent } from '../events'
import { computeInputStuff } from '../helpers'
import { InputsProps, InputsPropsFromDispatch, InputsPropsFromState } from '../types'
import { StringedInputProps } from './types'

const mapStateToProps: (state: ImmutableState) => InputsPropsFromState =
    (state: ImmutableState): InputsPropsFromState => {
        const specState: ImmutableSpecState = state.get(StateKey.SPEC)

        return {
            attributes: specState
                .get(SpecStateKey.ATTRIBUTES),
            displayedSpec: specState
                .get(SpecStateKey.DISPLAYED_SPEC),
            submittedSpec: specState
                .get(SpecStateKey.SUBMITTED_SPEC),
            validationFunction: specState
                .get(SpecStateKey.VALIDATION_FUNCTION),
            validationResults: specState
                .get(SpecStateKey.VALIDATION_RESULTS),
        }
    }

const mapDispatchToProps: (dispatch: Dispatch) => InputsPropsFromDispatch =
    (dispatch: Dispatch): InputsPropsFromDispatch => ({
        handleFieldChangeEvent: computeHandleFieldChangeEvent({ dispatch }),
    })

const StringedInputs: React.ComponentType<InputsProps> =
    (inputsProps: InputsProps): React.ReactElement | null => {
        const { fieldId, fieldValidityClassName, onChange, value } = computeInputStuff(inputsProps)

        const stringedInputProps: StringedInputProps = {
            className: fieldValidityClassName,
            id: fieldId,
            onChange,
            type: 'text',
            value: value as string,
        }

        return (
            <div {...{ className: 'inputs stringed-inputs' }}>
                <input {...stringedInputProps} />
            </div>
        )
    }

export default connect(mapStateToProps, mapDispatchToProps)(StringedInputs)
