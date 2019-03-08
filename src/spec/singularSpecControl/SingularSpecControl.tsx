// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect

import { SpecAttributes, SpecPropertyAttributes } from '@musical-patterns/pattern'
import { camelCaseToLowerCase, isUndefined, Maybe } from '@musical-patterns/utilities'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { EventHandler, ImmutableState, SecretSelectorsForTest, StateKey } from '../../types'
import { Input, InputProps } from '../input'
import { InvalidSpecMessage } from '../invalidSpecMessage'
import { stringifyIfNecessary } from '../stringifyIfNecessary'
import { SpecStateKey } from '../types'
import { Units } from '../units'
import { buildSpecControlChangeHandler } from './events'
import { specControlId } from './specControlId'
import './styles'
import {
    SingularSpecControlProps,
    SingularSpecControlPropsFromDispatch,
    SingularSpecControlPropsFromState, SpecChangeEventParameters,
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
            arrayedPropertyIndex,
            specKey,
            handleSpecChange,
            specState,
            invalidSpecMessage,
            displayedSpecValue,
            submittedSpecValue,
        } = singularSpecControlProps

        const specAttributes: SpecAttributes = specState.get(SpecStateKey.SPEC_ATTRIBUTES)
        const specPropertyAttributes: Maybe<SpecPropertyAttributes> = specAttributes[ specKey ]
        const { description, formattedName } = specPropertyAttributes

        const specChangeEventParameters: SpecChangeEventParameters = { arrayedPropertyIndex, specKey, specState }

        const onChange: EventHandler = (event: React.SyntheticEvent): void => {
            handleSpecChange({ ...specChangeEventParameters, event })
        }

        const isNotAnArrayedProperty: boolean = isUndefined(arrayedPropertyIndex)
        const id: string = specControlId({ isNotAnArrayedProperty, arrayedPropertyIndex, specKey })

        const validityClass: string = getValidityClass(invalidSpecMessage)
        const inputProps: InputProps = { validityClass, onChange, id, value: displayedSpecValue }

        const secretClass: string = SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL

        return (
            <div {...{ className: 'singular-spec-control', id, title: description }}>
                <span {...{ className: secretClass }}>{stringifyIfNecessary(submittedSpecValue)}</span>
                {isNotAnArrayedProperty && <div>{formattedName || camelCaseToLowerCase(specKey)}</div>}
                <Input {...{ specPropertyAttributes, inputProps }}/>
                <Units {...{ specKey }}/>
                {invalidSpecMessage && <InvalidSpecMessage {...{ invalidSpecMessage }}/>}
            </div>
        )
    }

export default connect(mapStateToProps, mapDispatchToProps)(SingularSpecControl)
