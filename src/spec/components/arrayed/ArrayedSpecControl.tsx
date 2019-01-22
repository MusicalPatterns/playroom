import { camelCaseToLowerCase, to } from '@musical-patterns/utilities'
import * as React from 'react'
import { DomValueOrChecked, SecretSelectorsForTest } from '../../../types'
import { InvalidSpecMessage } from '../../types'
import { stringifyIfNecessary } from '../helpers'
import SpecControl from '../SpecControl'
import AddButton from './AddButton'
import RemoveButton from './RemoveButton'
import { ArrayedSpecControlProps } from './types'

const ArrayedSpecControl: (props: ArrayedSpecControlProps) => JSX.Element =
    (props: ArrayedSpecControlProps): JSX.Element => {
        const {
            displayedSpecValue,
            submittedSpecValue,
            invalidSpecMessages,
            specKey,
            specControlsProps,
            specPropertyAttributes,
            specState,
        } = props

        const displayedSpecValueArray: DomValueOrChecked[] = displayedSpecValue as DomValueOrChecked[]
        const submittedSpecValueArray: DomValueOrChecked[] = submittedSpecValue as DomValueOrChecked[]
        const controls: JSX.Element[] = displayedSpecValueArray.map(
            (value: DomValueOrChecked, index: number): JSX.Element => {
                let invalidMessage: InvalidSpecMessage = invalidSpecMessages[ specKey ]
                if (invalidMessage && invalidMessage instanceof Array) {
                    invalidMessage = invalidMessage[ index ]
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
            <div {...{ id: specKey, className: 'arrayed-control' }}>
                <span {...{ className: SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL }}>
                    {stringifyIfNecessary(submittedSpecValueArray)}
                </span>
                <div>{specPropertyAttributes.formattedName || camelCaseToLowerCase(specKey)}</div>
                {controls}
                <AddButton {...{ specKey, specState }}/>
                <RemoveButton {...{ specKey, specState }}/>
            </div>
        )
    }

export default ArrayedSpecControl
