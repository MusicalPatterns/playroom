// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect no-null-keyword

import { OptionedConfiguration, OptionedConstraintOption } from '@musical-patterns/pattern'
import { constantCaseToUpperCase, from, HtmlValue, map, Ordinal } from '@musical-patterns/utilities'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { ImmutableState, StateKey } from '../../../types'
import { ImmutableSpecState, SpecStateKey } from '../../types'
import { computeSharedInputAttributes } from '../attributes'
import { computeHandleFieldChangeEvent } from '../events'
import { InputsPropsFromDispatch, InputsPropsFromState, SharedInputsProps } from '../types'
import { sortOptions } from './sort'
import { OptionedInputProps } from './types'

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

const OptionedInputs: React.ComponentType<SharedInputsProps> =
    (sharedInputsProps: SharedInputsProps): React.ReactElement | null => {
        const { fieldId, fieldValidityClassName, onChange, value } = computeSharedInputAttributes(sharedInputsProps)

        const { configurations, specKey } = sharedInputsProps
        const { constraint } = configurations[ specKey ] as OptionedConfiguration
        const optionElements: Array<React.ReactElement | null> = map(
            constraint.sort(sortOptions),
            (
                { value: optionValue, description, formattedName }: OptionedConstraintOption, index: Ordinal,
            ): React.ReactElement | null => (
                <option {...{ key: from.Ordinal(index), value: optionValue, title: description }}>
                    {formattedName || constantCaseToUpperCase(optionValue)}
                </option>
            ),
        )
        const optionedInputProps: OptionedInputProps = {
            className: fieldValidityClassName,
            id: fieldId,
            onChange,
            value: value as HtmlValue,
        }

        return (
            <div {...{ className: 'inputs optioned-inputs' }}>
                <select {...optionedInputProps}>
                    {optionElements}
                </select>
            </div>
        )
    }

export default connect(mapStateToProps, mapDispatchToProps)(OptionedInputs)
