// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect no-null-keyword

import {
    ArrayedDomValue,
    ArrayedValidationResult,
    ArrayedValue,
    DomValue,
    PropertyAttributes,
    SingularDomValue,
    SingularValidationResult,
    SingularValue,
    ValidationResult,
    Value,
} from '@musical-patterns/pattern'
import { isUndefined, Maybe } from '@musical-patterns/utilities'
import * as React from 'react'
import { connect } from 'react-redux'
import { ImmutableState, StateKey } from '../../../types'
import { ImmutableSpecState, SpecStateKey } from '../../types'
import { ArrayedSpecControl } from '../arrayedSpecControl'
import { SingularSpecControl } from '../singularSpecControl'
import './styles'
import { SpecControlProps, SpecControlPropsFromState } from './types'

const mapStateToProps: (state: ImmutableState) => SpecControlPropsFromState =
    (state: ImmutableState): SpecControlPropsFromState => {
        const specState: ImmutableSpecState = state.get(StateKey.SPEC)

        return {
            attributes: specState.get(SpecStateKey.ATTRIBUTES),
            displayedSpec: specState.get(SpecStateKey.DISPLAYED_SPEC),
            submittedSpec: specState.get(SpecStateKey.SUBMITTED_SPEC),
            validationResults: specState.get(SpecStateKey.VALIDATION_RESULTS),
        }
    }

const SpecControl: React.ComponentType<SpecControlProps> =
    (specControlProps: SpecControlProps): React.ReactElement | null => {
        const { property, displayedSpec, submittedSpec, validationResults, attributes } = specControlProps
        const displayedValue: Maybe<DomValue> = displayedSpec[ property ]
        const validationResult: ValidationResult = validationResults && validationResults[ property ]
        const submittedValue: Maybe<Value> = submittedSpec[ property ]
        const propertyAttributes: PropertyAttributes = attributes[ property ]

        if (isUndefined(submittedValue) || isUndefined(displayedValue)) {
            return null
        }

        if (propertyAttributes.isArrayed) {
            return (
                <ArrayedSpecControl
                    {...{
                        arrayedDisplayedValue: displayedValue as ArrayedDomValue,
                        arrayedSubmittedValue: submittedValue as ArrayedValue,
                        arrayedValidationResult: validationResult as ArrayedValidationResult,
                        property,
                        propertyAttributes,
                    }}
                />
            )
        }

        return (
            <SingularSpecControl
                {...{
                    property,
                    propertyAttributes,
                    singularDisplayedValue: displayedValue as SingularDomValue,
                    singularSubmittedValue: submittedValue as SingularValue,
                    singularValidationResult: validationResult as SingularValidationResult,
                }}
            />
        )
    }

export default connect(mapStateToProps)(SpecControl)
