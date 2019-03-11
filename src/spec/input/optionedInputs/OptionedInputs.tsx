// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect no-null-keyword

import { OptionedConstraintOption, OptionedPropertyAttributes } from '@musical-patterns/pattern'
import { constantCaseToUpperCase, from, HtmlValue, map, Ordinal } from '@musical-patterns/utilities'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { ImmutableState, StateKey } from '../../../types'
import { ImmutableSpecState, SpecStateKey } from '../../types'
import { computeHandleFieldChangeEvent } from '../events'
import { computeInputStuff } from '../helpers'
import { InputsProps, InputsPropsFromDispatch, InputsPropsFromState } from '../types'
import { sortOptions } from './sort'
import { OptionedInputProps } from './types'

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

const OptionedInputs: React.ComponentType<InputsProps> =
    (inputsProps: InputsProps): React.ReactElement | null => {
        const { fieldId, fieldValidityClassName, onChange, value } = computeInputStuff(inputsProps)

        const { attributes, property } = inputsProps
        const { constraint } = attributes[ property ] as OptionedPropertyAttributes
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
