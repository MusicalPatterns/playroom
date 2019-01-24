import { defaultSpecPropertyAttributes, Spec, SpecPropertyAttributes } from '@musical-patterns/pattern'
import * as React from 'react'
import { DomValueOrChecked, SpecValue } from '../../types'
import { SpecStateKeys } from '../state'
import { InvalidSpecMessages, SingularPropertyInvalidSpecMessage } from '../types'
import { ArrayedSpecControl } from './arrayed'
import SingularSpecControl from './SingularSpecControl'

const SpecControl: (specControlProps: any) => JSX.Element =
    ({ specAttributes, specKey, specControlsProps }: any): JSX.Element => {
        const specPropertyAttributes: SpecPropertyAttributes =
            specAttributes[ specKey ] || defaultSpecPropertyAttributes

        const { specState } = specControlsProps
        const displayedSpec: Spec = specState.get(SpecStateKeys.DISPLAYED_SPEC)
        const invalidMessages: InvalidSpecMessages = specState.get(SpecStateKeys.INVALID_SPEC_MESSAGES)
        const submittedSpec: Spec = specState.get(SpecStateKeys.SUBMITTED_SPEC)

        const submittedSpecValue: SpecValue = submittedSpec[ specKey ] as SpecValue
        const displayedSpecValue: SpecValue = displayedSpec[ specKey ] as SpecValue

        if (specPropertyAttributes.isArray) {
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
