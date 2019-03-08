// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect

import { PropertyAttributes } from '@musical-patterns/pattern'
import { camelCaseToLowerCase, isUndefined } from '@musical-patterns/utilities'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { EventHandler, ImmutableState, SecretSelectorsForTest, StateKey } from '../../../types'
import { ImmutableSpecState, SpecStateKey } from '../../types'
import { Field, FieldPropsFromParent } from '../field'
import { InvalidMessage } from '../invalidMessage'
import { stringifyIfNecessary } from '../stringifyIfNecessary'
import { Units } from '../units'
import { buildSpecControlChangeHandler } from './events'
import { specControlId } from './specControlId'
import './styles'
import {
    SingularSpecControlProps,
    SingularSpecControlPropsFromDispatch,
    SingularSpecControlPropsFromState,
} from './types'
import { getValidityClass } from './validityClass'

const mapStateToProps: (state: ImmutableState) => SingularSpecControlPropsFromState =
    (state: ImmutableState): SingularSpecControlPropsFromState => {
        const specState: ImmutableSpecState = state.get(StateKey.SPEC)

        return {
            attributes: specState.get(SpecStateKey.ATTRIBUTES),
            displayedSpec: specState.get(SpecStateKey.DISPLAYED_SPEC),
            submittedSpec: specState.get(SpecStateKey.SUBMITTED_SPEC),
            validationFunction: specState.get(SpecStateKey.VALIDATION_FUNCTION),
        }
    }

const mapDispatchToProps: (dispatch: Dispatch) => SingularSpecControlPropsFromDispatch =
    (dispatch: Dispatch): SingularSpecControlPropsFromDispatch => ({
        handleSpecChangeEvent: buildSpecControlChangeHandler({ dispatch }),
    })

const SingularSpecControl: React.ComponentType<SingularSpecControlProps> =
    (singularSpecControlProps: SingularSpecControlProps): JSX.Element => {
        const {
            fieldIndex,
            property,
            handleSpecChangeEvent,
            attributes,
            displayedSpec,
            submittedSpec,
            validationFunction,
            singularValidationResult,
            singularDisplayedValue,
            singularSubmittedValue,
        } = singularSpecControlProps

        const propertyAttributes: PropertyAttributes = attributes[ property ]
        const { description, formattedName } = propertyAttributes

        const onChange: EventHandler = (event: React.SyntheticEvent): void => {
            handleSpecChangeEvent({
                attributes,
                displayedSpec,
                event,
                fieldIndex,
                property,
                submittedSpec,
                validationFunction,
            })
        }

        const isNotAnArrayedSpecControl: boolean = isUndefined(fieldIndex)
        const id: string = specControlId({ isNotAnArrayedSpecControl, fieldIndex, property })

        const validityClass: string = getValidityClass(singularValidationResult)
        const fieldProps: FieldPropsFromParent = {
            id,
            onChange,
            property,
            validityClass,
            value: singularDisplayedValue,
        }

        const secretClass: string = SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL

        return (
            <div {...{ className: 'singular-spec-control', id, title: description }}>
                <span {...{ className: secretClass }}>{stringifyIfNecessary(singularSubmittedValue)}</span>
                {isNotAnArrayedSpecControl && <div>{formattedName || camelCaseToLowerCase(property)}</div>}
                <Field {...fieldProps}/>
                <Units {...{ property }}/>
                {singularValidationResult && <InvalidMessage {...{ invalidMessage: singularValidationResult }}/>}
            </div>
        )
    }

export default connect(mapStateToProps, mapDispatchToProps)(SingularSpecControl)
