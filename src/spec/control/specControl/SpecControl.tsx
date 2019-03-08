// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect

import {
    ArrayedDomValue,
    ArrayedValidationResult,
    ArrayedValue,
    Attributes,
    DomSpec,
    DomValue,
    PropertyAttributes,
    SingularDomValue,
    SingularValidationResult,
    SingularValue,
    Spec,
    ValidationResult,
    ValidationResults,
    Value,
} from '@musical-patterns/pattern'
import { isUndefined, Maybe } from '@musical-patterns/utilities'
import * as React from 'react'
import { connect } from 'react-redux'
import { ImmutableState, StateKey } from '../../../types'
import { SpecStateKey } from '../../types'
import { ArrayedSpecControl } from '../arrayedSpecControl'
import { SingularSpecControl } from '../singularSpecControl'
import { AddOrRemoveButtonPropsFromState } from '../types'
import { SpecControlProps } from './types'

const mapStateToProps: (state: ImmutableState) => AddOrRemoveButtonPropsFromState =
    (state: ImmutableState): AddOrRemoveButtonPropsFromState => ({
        specState: state.get(StateKey.SPEC),
    })

const SpecControl: React.ComponentType<SpecControlProps> =
    ({ property, specState }: SpecControlProps): JSX.Element => {
        const displayedSpec: DomSpec = specState.get(SpecStateKey.DISPLAYED_SPEC)
        const displayedValue: Maybe<DomValue> = displayedSpec[ property ]

        const validationResults: ValidationResults = specState.get(SpecStateKey.VALIDATION_RESULTS)
        const validationResult: ValidationResult = validationResults && validationResults[ property ]

        const submittedSpec: Spec = specState.get(SpecStateKey.SUBMITTED_SPEC)
        const submittedValue: Maybe<Value> = submittedSpec[ property ]

        const attributes: Attributes = specState.get(SpecStateKey.ATTRIBUTES)
        const propertyAttributes: PropertyAttributes = attributes[ property ]

        if (isUndefined(submittedValue) || isUndefined(displayedValue)) {
            return <div/>
        }

        if (propertyAttributes.isArrayed) {
            return <ArrayedSpecControl {...{
                arrayedDisplayedValue: displayedValue as ArrayedDomValue,
                arrayedSubmittedValue: submittedValue as ArrayedValue,
                arrayedValidationResult: validationResult as ArrayedValidationResult,
                property,
                propertyAttributes,
            }}/>
        }

        return <SingularSpecControl {...{
            property,
            propertyAttributes,
            singularDisplayedValue: displayedValue as SingularDomValue,
            singularSubmittedValue: submittedValue as SingularValue,
            singularValidationResult: validationResult as SingularValidationResult,
        }}/>
    }

export default connect(mapStateToProps)(SpecControl)
