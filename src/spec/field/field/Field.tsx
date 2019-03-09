// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect

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
import { buildHandleFieldChangeEvent } from './events'
import { getFieldId, getFieldLabel, getFieldValidityClassName } from './helpers'
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
        handleFieldChangeEvent: buildHandleFieldChangeEvent({ dispatch }),
    })

const Field: React.ComponentType<FieldProps> =
    (fieldProps: FieldProps): JSX.Element => {
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

        const fieldId: string = getFieldId({ fieldIndex, property })
        const fieldLabel: string = getFieldLabel({ fieldIndex, formattedName, property })
        const fieldValidityClassName: string = getFieldValidityClassName(singularValidationResult)

        return (
            <div {...{ className: 'field', id: fieldId, title: description }}>
                <div>{fieldLabel}</div>
                <Inputs {...{ fieldValidityClassName, fieldId, onChange, property, value: singularDisplayedValue }}/>
                <Units {...{ property }}/>
                {singularValidationResult && <InvalidMessage {...{ invalidMessage: singularValidationResult }}/>}
                <SecretSubmittedSpecForTest {...{ submittedValue: singularSubmittedValue, fieldId }}/>
            </div>
        )
    }

export default connect(mapStateToProps, mapDispatchToProps)(Field)
