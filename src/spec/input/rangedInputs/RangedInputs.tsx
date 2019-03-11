// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect no-null-keyword

import { RangedInputType, RangedPropertyAttributes } from '@musical-patterns/pattern'
import { HtmlValue } from '@musical-patterns/utilities'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { ImmutableState, StateKey } from '../../../types'
import { ImmutableSpecState, SpecStateKey } from '../../types'
import { computeHandleFieldChangeEvent } from '../events'
import { computeInputStuff } from '../helpers'
import { InputsProps, InputsPropsFromDispatch, InputsPropsFromState } from '../types'
import { computeMinAndMax, computeStep } from './helpers'
import './styles'
import { RangedInputProps } from './types'

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

const RangedInputs: React.ComponentType<InputsProps> =
    (inputsProps: InputsProps): React.ReactElement | null => {
        const { fieldId, fieldValidityClassName, onChange, value } = computeInputStuff(inputsProps)

        const { attributes, property } = inputsProps
        const { constraint, hideInput } = attributes[ property ] as RangedPropertyAttributes
        const { min, max } = computeMinAndMax(constraint)
        const step: number = computeStep(constraint)
        const rangedInputProps: RangedInputProps = {
            className: fieldValidityClassName,
            id: fieldId,
            max,
            min,
            onChange,
            step,
            value: value as HtmlValue,
        }

        return (
            <div {...{ className: 'inputs ranged-inputs' }}>
                {hideInput !== RangedInputType.NUMBER && <input {...{ ...rangedInputProps, type: 'number' }} />}
                {hideInput !== RangedInputType.RANGE && <input {...{ ...rangedInputProps, type: 'range' }} />}
            </div>
        )
    }

export default connect(mapStateToProps, mapDispatchToProps)(RangedInputs)
