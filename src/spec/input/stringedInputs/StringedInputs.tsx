// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect no-null-keyword

import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { ImmutableState, StateKey } from '../../../types'
import { ImmutableSpecState, SpecStateKey } from '../../types'
import { computeSharedInputAttributes } from '../attributes'
import { computeHandleFieldChangeEvent } from '../events'
import { InputsPropsFromDispatch, InputsPropsFromState, SharedInputsProps } from '../types'
import { StringedInputProps } from './types'

const mapStateToProps: (state: ImmutableState) => InputsPropsFromState =
    (state: ImmutableState): InputsPropsFromState => {
        const specState: ImmutableSpecState = state.get(StateKey.SPEC)

        return {
            computeValidations: specState.get(SpecStateKey.COMPUTE_VALIDATIONS),
            configurations: specState.get(SpecStateKey.CONFIGURATIONS),
            displayedSpecs: specState.get(SpecStateKey.DISPLAYED_SPECS),
            submittedSpecs: specState.get(SpecStateKey.SUBMITTED_SPECS),
            validations: specState.get(SpecStateKey.VALIDATIONS),
        }
    }

const mapDispatchToProps: (dispatch: Dispatch) => InputsPropsFromDispatch =
    (dispatch: Dispatch): InputsPropsFromDispatch => ({
        handleFieldChangeEvent: computeHandleFieldChangeEvent({ dispatch }),
    })

const StringedInputs: React.ComponentType<SharedInputsProps> =
    (sharedInputsProps: SharedInputsProps): React.ReactElement | null => {
        const { fieldId, fieldValidityClassName, onChange, value } = computeSharedInputAttributes(sharedInputsProps)

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
