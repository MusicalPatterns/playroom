import { defaultSpecPropertyAttributes, Spec, SpecPropertyAttributes } from '@musical-patterns/pattern'
import { ARBITRARILY_LARGE_NUMBER, Maybe } from '@musical-patterns/utilities'
import * as React from 'react'
import { DomValueOrChecked, SpecValue } from '../../types'
import { SpecStateKeys } from '../state'
import { InvalidSpecMessages, SingularPropertyInvalidSpecMessage } from '../types'
import { ArrayedSpecControl } from './arrayed'
import SpecControl from './SpecControl'
import { BuildControlsProps } from './types'

const buildControls: (props: BuildControlsProps) => JSX.Element[] =
    ({ specKeys, specAttributes, specControlsProps }: BuildControlsProps): JSX.Element[] =>
        specKeys
            .sort((specKey: string, nextSpecKey: string): number => {
                const order: Maybe<number> = specAttributes[ specKey ].order
                const sortOrder: number = order === undefined ? ARBITRARILY_LARGE_NUMBER : order

                const nextOrder: Maybe<number> = specAttributes[ nextSpecKey ].order
                const nextSortOrder: number = nextOrder === undefined ? ARBITRARILY_LARGE_NUMBER : nextOrder

                return sortOrder < nextSortOrder ? -1 : 1
            })
            .map(
                (specKey: string, key: number): JSX.Element => {
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
                            key,
                            specControlsProps,
                            specKey,
                            specPropertyAttributes,
                            submittedSpecValues: submittedSpecValue as DomValueOrChecked[],
                        }}/>
                    }

                    return <SpecControl {...{
                        displayedSpecValue: displayedSpecValue as DomValueOrChecked,
                        invalidMessage: invalidMessages[ specKey ] as SingularPropertyInvalidSpecMessage,
                        key,
                        specControlsProps,
                        specKey,
                        specPropertyAttributes,
                        submittedSpecValue: submittedSpecValue as DomValueOrChecked,
                    }}/>
                },
            )

export {
    buildControls,
}
