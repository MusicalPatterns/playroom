// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect no-null-keyword

import { PropertyAttributes } from '@musical-patterns/pattern'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { EventHandler, ImmutableState, StateKey } from '../../../types'
import { Inputs } from '../../input'
import { ImmutableSpecState, SpecStateKey } from '../../types'
import { InvalidMessage } from '../invalidMessage'
import { SecretSubmittedSpecForTest } from '../secretSubmittedSpecForTest'
import { Units } from '../units'
import { computeHandleFieldChangeEvent } from './events'
import { computeFieldId, computeFieldLabel, computeFieldValidityClassName } from './helpers'
import './styles'
import { FieldProps, FieldPropsFromDispatch, FieldPropsFromState } from './types'

const mapStateToProps: (state: ImmutableState) => FieldPropsFromState =
    (state: ImmutableState): FieldPropsFromState => {
        const specState: ImmutableSpecState = state.get(StateKey.SPEC)

        return {
            attributes: specState.get(SpecStateKey.ATTRIBUTES),
            displayedSpec: specState.get(SpecStateKey.DISPLAYED_SPEC),
            submittedSpec: specState.get(SpecStateKey.SUBMITTED_SPEC),
            validationFunction: specState.get(SpecStateKey.VALIDATION_FUNCTION),
        }
    }

const mapDispatchToProps: (dispatch: Dispatch) => FieldPropsFromDispatch =
    (dispatch: Dispatch): FieldPropsFromDispatch => ({
        handleFieldChangeEvent: computeHandleFieldChangeEvent({ dispatch }),
    })

const Field: React.ComponentType<FieldProps> =
    (fieldProps: FieldProps): React.ReactElement | null => {
        const {
            attributes,
            fieldIndex,
            handleFieldChangeEvent,
            property,
            singularDisplayedValue,
            singularSubmittedValue,
            singularValidationResult,
            ...otherProps
        } = fieldProps

        const { description, formattedName }: PropertyAttributes = attributes[ property ]

        const onChange: EventHandler = (event: React.SyntheticEvent): void => {
            handleFieldChangeEvent({ attributes, event, fieldIndex, property, ...otherProps })
        }

        const fieldId: string = computeFieldId({ fieldIndex, property })
        const fieldLabel: string = computeFieldLabel({ fieldIndex, formattedName, property })
        const fieldValidityClassName: string = computeFieldValidityClassName(singularValidationResult)

        return (
            <div {...{ className: 'field', id: fieldId, title: description }}>
                <div>{fieldLabel}</div>
                <Inputs {...{ fieldValidityClassName, fieldId, onChange, property, value: singularDisplayedValue }}/>
                <Units {...{ property }}/>
                <InvalidMessage {...{ singularValidationResult }}/>
                <SecretSubmittedSpecForTest {...{ submittedValue: singularSubmittedValue, fieldId }}/>
            </div>
        )
    }

export default connect(mapStateToProps, mapDispatchToProps)(Field)
