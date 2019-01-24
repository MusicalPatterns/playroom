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
                    const invalidSpecMessages: InvalidSpecMessages = specState.get(SpecStateKeys.INVALID_SPEC_MESSAGES)
                    const submittedSpec: Spec = specState.get(SpecStateKeys.SUBMITTED_SPEC)

                    const submittedSpecValue: SpecValue = submittedSpec[ specKey ] as SpecValue
                    const displayedSpecValue: SpecValue = displayedSpec[ specKey ] as SpecValue

                    if (specPropertyAttributes.isArray) {
                        return <ArrayedSpecControl {...{
                            displayedSpecValue,
                            invalidSpecMessages,
                            key,
                            specControlsProps,
                            specKey,
                            specPropertyAttributes,
                            specState,
                            submittedSpecValue,
                        }}/>
                    }

                    return <SpecControl {...{
                        invalidMessage: invalidSpecMessages[ specKey ] as SingularPropertyInvalidSpecMessage,
                        key,
                        secretSubmittedSpecValue: submittedSpecValue as DomValueOrChecked,
                        specControlsProps,
                        specKey,
                        specPropertyAttributes,
                        specValue: displayedSpecValue as DomValueOrChecked,
                    }}/>
                },
            )

export {
    buildControls,
}
