import {
    ArrayedDomSpecValue,
    ArrayedSpecValue,
    DomSpec,
    DomSpecValue,
    SingularDomSpecValue,
    SingularPropertyInvalidSpecMessage,
    SingularSpecValue,
    Spec,
    SpecValidationResults,
    SpecValue,
} from '@musical-patterns/pattern'
import { Maybe } from '@musical-patterns/utilities'
import * as React from 'react'
import { SpecStateKey } from '../state'
import { ArrayedSpecControl } from './arrayed'
import SingularSpecControl from './SingularSpecControl'
import { SpecControlProps } from './types'

const SpecControl: React.ComponentType<SpecControlProps> =
    ({ specPropertyAttributes, specKey, specControlsProps }: SpecControlProps): JSX.Element => {
        const { specState } = specControlsProps
        const displayedSpec: DomSpec = specState.get(SpecStateKey.DISPLAYED_SPEC)
        const specValidationResults: SpecValidationResults = specState.get(SpecStateKey.SPEC_VALIDATION_RESULTS)
        const submittedSpec: Spec = specState.get(SpecStateKey.SUBMITTED_SPEC)

        const submittedSpecValue: Maybe<SpecValue> = submittedSpec[ specKey ]
        const displayedSpecValue: Maybe<DomSpecValue> = displayedSpec[ specKey ]

        if (submittedSpecValue === undefined || displayedSpecValue === undefined) {
            return <div/>
        }

        if (specPropertyAttributes.isArrayed) {
            return <ArrayedSpecControl {...{
                displayedSpecValues: displayedSpecValue as ArrayedDomSpecValue,
                specControlsProps,
                specKey,
                specPropertyAttributes,
                specValidationResults,
                submittedSpecValues: submittedSpecValue as ArrayedSpecValue,
            }}/>
        }

        return <SingularSpecControl {...{
            displayedSpecValue: displayedSpecValue as SingularDomSpecValue,
            invalidSpecMessage:
                specValidationResults && specValidationResults[ specKey ] as SingularPropertyInvalidSpecMessage,
            specControlsProps,
            specKey,
            specPropertyAttributes,
            submittedSpecValue: submittedSpecValue as SingularSpecValue,
        }}/>
    }

export default SpecControl
