import { SingularPropertyInvalidSpecMessage, Spec, SpecValidationResults } from '@musical-patterns/pattern'
import * as React from 'react'
import { DomValueOrChecked, SpecValue } from '../../types'
import { SpecStateKey } from '../state'
import { ArrayedSpecControl } from './arrayed'
import SingularSpecControl from './SingularSpecControl'
import { SpecControlProps } from './types'

const SpecControl: React.ComponentType<SpecControlProps> =
    ({ specPropertyAttributes, specKey, specControlsProps }: SpecControlProps): JSX.Element => {
        const { specState } = specControlsProps
        const displayedSpec: Spec = specState.get(SpecStateKey.DISPLAYED_SPEC)
        const specValidationResults: SpecValidationResults = specState.get(SpecStateKey.SPEC_VALIDATION_RESULTS)
        const submittedSpec: Spec = specState.get(SpecStateKey.SUBMITTED_SPEC)

        const submittedSpecValue: SpecValue = submittedSpec[ specKey ] as SpecValue
        const displayedSpecValue: SpecValue = displayedSpec[ specKey ] as SpecValue

        if (specPropertyAttributes.isArrayed) {
            return <ArrayedSpecControl {...{
                displayedSpecValues: displayedSpecValue as DomValueOrChecked[],
                specControlsProps,
                specKey,
                specPropertyAttributes,
                specValidationResults,
                submittedSpecValues: submittedSpecValue as DomValueOrChecked[],
            }}/>
        }

        return <SingularSpecControl {...{
            displayedSpecValue: displayedSpecValue as DomValueOrChecked,
            invalidSpecMessage:
                specValidationResults && specValidationResults[ specKey ] as SingularPropertyInvalidSpecMessage,
            specControlsProps,
            specKey,
            specPropertyAttributes,
            submittedSpecValue: submittedSpecValue as DomValueOrChecked,
        }}/>
    }

export default SpecControl
