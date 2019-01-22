import { defaultSpecPropertyAttributes, Spec, SpecPropertyAttributes } from '@musical-patterns/pattern'
import { camelCaseToLowerCase, to } from '@musical-patterns/utilities'
import * as React from 'react'
import { DomValueOrChecked, SpecValue } from '../../types'
import { SpecStateKeys } from '../state'
import { ArrayedPropertyInvalidSpecMessage, InvalidSpecMessages, SingularPropertyInvalidSpecMessage } from '../types'
import AddButton from './AddButton'
import RemoveButton from './RemoveButton'
import SpecControl from './SpecControl'
import { BuildControlsProps } from './types'

const buildControls: (props: BuildControlsProps) => JSX.Element[] =
    ({ specKeys, specAttributes, specControlsProps }: BuildControlsProps): JSX.Element[] =>
        specKeys
            .sort()
            .map(
                (specKey: string, key: number): JSX.Element => {
                    const specPropertyAttributes: SpecPropertyAttributes =
                        specAttributes[ specKey ] || defaultSpecPropertyAttributes

                    const { specState } = specControlsProps
                    const displayedSpec: Spec = specState.get(SpecStateKeys.DISPLAYED_SPEC)
                    const invalidSpecMessages: InvalidSpecMessages = specState.get(SpecStateKeys.INVALID_SPEC_MESSAGES)
                    const submittedSpec: Spec = specState.get(SpecStateKeys.SUBMITTED_SPEC)

                    const submittedSpecValue: SpecValue = submittedSpec[ specKey ] as SpecValue
                    const displayedSpecValue: SpecValue = displayedSpec[ specKey ] as SpecValue

                    if (specPropertyAttributes.isArray) {
                        const displayedSpecValueArray: DomValueOrChecked[] = displayedSpecValue as DomValueOrChecked[]
                        const submittedSpecValueArray: DomValueOrChecked[] = submittedSpecValue as DomValueOrChecked[]
                        const controls: JSX.Element[] = displayedSpecValueArray.map(
                            (value: DomValueOrChecked, index: number): JSX.Element => {
                                let invalidMessage: SingularPropertyInvalidSpecMessage
                                if (invalidSpecMessages[ specKey ]) {
                                    const invalidMessagesArray: ArrayedPropertyInvalidSpecMessage =
                                        invalidSpecMessages[ specKey ] as ArrayedPropertyInvalidSpecMessage
                                    invalidMessage = invalidMessagesArray && invalidMessagesArray[ index ]
                                }

                                return (
                                    <SpecControl {...{
                                        arrayedPropertyIndex: to.Index(index),
                                        invalidMessage,
                                        key: index,
                                        secretSubmittedSpecValue: submittedSpecValueArray[ index ],
                                        specControlsProps,
                                        specKey,
                                        specPropertyAttributes,
                                        specValue: value,
                                    }}/>
                                )
                            },
                        )

                        return (
                            <div {...{ key, id: specKey, className: 'arrayed-control' }}>
                                <div>{specPropertyAttributes.formattedName || camelCaseToLowerCase(specKey)}</div>
                                {controls}
                                <AddButton {...{ specKey, displayedSpec }}/>
                                <RemoveButton {...{ specKey, displayedSpec }}/>
                            </div>
                        )
                    }
                    else {
                        return (
                            <SpecControl {...{
                                invalidMessage: invalidSpecMessages[ specKey ] as SingularPropertyInvalidSpecMessage,
                                key,
                                secretSubmittedSpecValue: submittedSpecValue as DomValueOrChecked,
                                specControlsProps,
                                specKey,
                                specPropertyAttributes,
                                specValue: displayedSpecValue as DomValueOrChecked,
                            }}/>
                        )
                    }
                },
            )

export {
    buildControls,
}
