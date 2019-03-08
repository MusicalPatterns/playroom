// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect

import {
    ArrayedDomSpecValue,
    ArrayedPropertyInvalidSpecMessage,
    ArrayedSpecValue,
    DomSpec,
    DomSpecValue,
    InvalidSpecMessage,
    SingularDomSpecValue,
    SingularPropertyInvalidSpecMessage,
    SingularSpecValue,
    Spec,
    SpecAttributes,
    SpecPropertyAttributes,
    SpecValidationResults,
    SpecValue,
} from '@musical-patterns/pattern'
import { isUndefined, Maybe } from '@musical-patterns/utilities'
import * as React from 'react'
import { connect } from 'react-redux'
import { ImmutableState, StateKey } from '../../types'
import { ArrayedSpecControl } from '../arrayedSpecControl'
import { SingularSpecControl } from '../singularSpecControl'
import { AddOrRemoveButtonPropsFromState, SpecStateKey } from '../types'
import { SpecControlProps } from './types'

const mapStateToProps: (state: ImmutableState) => AddOrRemoveButtonPropsFromState =
    (state: ImmutableState): AddOrRemoveButtonPropsFromState => ({
        specState: state.get(StateKey.SPEC),
    })

const SpecControl: React.ComponentType<SpecControlProps> =
    ({ specKey, specState }: SpecControlProps): JSX.Element => {
        const displayedSpec: DomSpec = specState.get(SpecStateKey.DISPLAYED_SPEC)
        const displayedSpecValue: Maybe<DomSpecValue> = displayedSpec[ specKey ]

        const specValidationResults: SpecValidationResults = specState.get(SpecStateKey.SPEC_VALIDATION_RESULTS)
        const specValidationResult: InvalidSpecMessage = specValidationResults && specValidationResults[ specKey ]

        const submittedSpec: Spec = specState.get(SpecStateKey.SUBMITTED_SPEC)
        const submittedSpecValue: Maybe<SpecValue> = submittedSpec[ specKey ]

        const specAttributes: SpecAttributes = specState.get(SpecStateKey.SPEC_ATTRIBUTES)
        const specPropertyAttributes: Maybe<SpecPropertyAttributes> = specAttributes[ specKey ]

        if (isUndefined(submittedSpecValue) || isUndefined(displayedSpecValue)) {
            return <div/>
        }

        if (specPropertyAttributes.isArrayed) {
            return <ArrayedSpecControl {...{
                displayedSpecValues: displayedSpecValue as ArrayedDomSpecValue,
                invalidSpecMessages: specValidationResult as ArrayedPropertyInvalidSpecMessage,
                specKey,
                specPropertyAttributes,
                submittedSpecValues: submittedSpecValue as ArrayedSpecValue,
            }}/>
        }

        return <SingularSpecControl {...{
            displayedSpecValue: displayedSpecValue as SingularDomSpecValue,
            invalidSpecMessage: specValidationResult as SingularPropertyInvalidSpecMessage,
            specKey,
            specPropertyAttributes,
            submittedSpecValue: submittedSpecValue as SingularSpecValue,
        }}/>
    }

export default connect(mapStateToProps)(SpecControl)
