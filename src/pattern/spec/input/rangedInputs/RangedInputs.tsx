// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect no-null-keyword

import { RangedConfiguration, RangedInputType } from '@musical-patterns/pattern'
import { HtmlValue } from '@musical-patterns/utilities'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { ImmutableState, StateKey } from '../../../../types'
import { PatternStateKey } from '../../../types'
import { ImmutableSpecState, SpecStateKey } from '../../types'
import { computeSharedInputAttributes } from '../attributes'
import { computeHandleFieldChangeEvent } from '../events'
import { InputsPropsFromDispatch, InputsPropsFromState, SharedInputsProps } from '../types'
import { computeMinAndMax, computeStep } from './helpers'
import './styles'
import { RangedInputProps } from './types'

const mapStateToProps: (state: ImmutableState) => InputsPropsFromState =
    (state: ImmutableState): InputsPropsFromState => {
        const specState: ImmutableSpecState = state.get(StateKey.PATTERN)
            .get(PatternStateKey.SPEC)

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

const RangedInputs: React.ComponentType<SharedInputsProps> =
    (sharedInputsProps: SharedInputsProps): React.ReactElement | null => {
        const { fieldId, fieldValidityClassName, onChange, value } = computeSharedInputAttributes(sharedInputsProps)

        const { configurations, specKey } = sharedInputsProps
        const { constraint, hideInput } = configurations[ specKey ] as RangedConfiguration
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
