// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect

import { Attributes, PropertyAttributes } from '@musical-patterns/pattern'
import { camelCaseToLowerCase, isUndefined } from '@musical-patterns/utilities'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { EventHandler, ImmutableState, SecretSelectorsForTest, StateKey } from '../../types'
import { Inputs, InputsPropsFromParent } from '../inputs'
import { InvalidMessage } from '../invalidMessage'
import { stringifyIfNecessary } from '../stringifyIfNecessary'
import { SpecStateKey } from '../types'
import { Units } from '../units'
import { buildSpecControlChangeHandler } from './events'
import { specControlId } from './specControlId'
import './styles'
import {
    SingularSpecControlProps,
    SingularSpecControlPropsFromDispatch,
    SingularSpecControlPropsFromState,
    SpecChangeEventParameters,
} from './types'
import { getValidityClass } from './validityClass'

const mapStateToProps: (state: ImmutableState) => SingularSpecControlPropsFromState =
    (state: ImmutableState): SingularSpecControlPropsFromState => ({
        specState: state.get(StateKey.SPEC),
    })

const mapDispatchToProps: (dispatch: Dispatch) => SingularSpecControlPropsFromDispatch =
    (dispatch: Dispatch): SingularSpecControlPropsFromDispatch => ({
        handleSpecChange: buildSpecControlChangeHandler({ dispatch }),
    })

const SingularSpecControl: React.ComponentType<SingularSpecControlProps> =
    (singularSpecControlProps: SingularSpecControlProps): JSX.Element => {
        const {
            arrayedFieldIndex,
            property,
            handleSpecChange,
            specState,
            singularValidationResult,
            singularDisplayedValue,
            singularSubmittedValue,
        } = singularSpecControlProps

        const attributes: Attributes = specState.get(SpecStateKey.ATTRIBUTES)
        const propertyAttributes: PropertyAttributes = attributes[ property ]
        const { description, formattedName } = propertyAttributes

        const specChangeEventParameters: SpecChangeEventParameters = { arrayedFieldIndex, property, specState }

        const onChange: EventHandler = (event: React.SyntheticEvent): void => {
            handleSpecChange({ ...specChangeEventParameters, event })
        }

        const isNotAnArrayedSpecControl: boolean = isUndefined(arrayedFieldIndex)
        const id: string = specControlId({ isNotAnArrayedSpecControl, arrayedFieldIndex, property })

        const validityClass: string = getValidityClass(singularValidationResult)
        const inputsProps: InputsPropsFromParent = {
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
                <Inputs {...inputsProps}/>
                <Units {...{ property }}/>
                {singularValidationResult && <InvalidMessage {...{ invalidMessage: singularValidationResult }}/>}
            </div>
        )
    }

export default connect(mapStateToProps, mapDispatchToProps)(SingularSpecControl)
