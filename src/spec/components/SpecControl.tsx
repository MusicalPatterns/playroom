import { Spec } from '@musical-patterns/pattern'
import * as React from 'react'
import { DomValueOrChecked, SpecValue } from '../../types'
import { SpecStateKey } from '../state'
import { InvalidSpecMessages, SingularPropertyInvalidSpecMessage } from '../types'
import { ArrayedSpecControl } from './arrayed'
import SingularSpecControl from './SingularSpecControl'
import { SpecControlProps } from './types'

const SpecControl: React.ComponentType<SpecControlProps> =
    ({ specPropertyAttributes, specKey, specControlsProps }: SpecControlProps): JSX.Element => {
        const { specState } = specControlsProps
        const displayedSpec: Spec = specState.get(SpecStateKey.DISPLAYED_SPEC)
        const invalidMessages: InvalidSpecMessages = specState.get(SpecStateKey.INVALID_SPEC_MESSAGES)
        const submittedSpec: Spec = specState.get(SpecStateKey.SUBMITTED_SPEC)

        const submittedSpecValue: SpecValue = submittedSpec[ specKey ] as SpecValue
        const displayedSpecValue: SpecValue = displayedSpec[ specKey ] as SpecValue

        if (specPropertyAttributes.isArrayed) {
            return <ArrayedSpecControl {...{
                displayedSpecValues: displayedSpecValue as DomValueOrChecked[],
                invalidMessages,
                specControlsProps,
                specKey,
                specPropertyAttributes,
                submittedSpecValues: submittedSpecValue as DomValueOrChecked[],
            }}/>
        }

        return <SingularSpecControl {...{
            displayedSpecValue: displayedSpecValue as DomValueOrChecked,
            invalidMessage: invalidMessages[ specKey ] as SingularPropertyInvalidSpecMessage,
            specControlsProps,
            specKey,
            specPropertyAttributes,
            submittedSpecValue: submittedSpecValue as DomValueOrChecked,
        }}/>
    }

export default SpecControl
