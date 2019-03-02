import { apply, camelCaseToLowerCase, from, map, Ordinal } from '@musical-patterns/utilities'
import * as React from 'react'
import { DomValueOrChecked, SecretSelectorsForTest } from '../../../types'
import { InvalidSpecMessage } from '../../types'
import { stringifyIfNecessary } from '../helpers'
import SingularSpecControl from '../SingularSpecControl'
import AddButton from './AddButton'
import RemoveButton from './RemoveButton'
import { ArrayedSpecControlProps } from './types'

const ArrayedSpecControl: (props: ArrayedSpecControlProps) => JSX.Element =
    (props: ArrayedSpecControlProps): JSX.Element => {
        const {
            displayedSpecValues,
            submittedSpecValues,
            invalidMessages,
            specKey,
            specControlsProps,
            specPropertyAttributes,
        } = props

        const controls: JSX.Element[] = map(
            displayedSpecValues,
            (value: DomValueOrChecked, index: Ordinal): JSX.Element => {
                let invalidMessage: InvalidSpecMessage = invalidMessages[ specKey ]
                if (invalidMessage && invalidMessage instanceof Array) {
                    invalidMessage = apply.Ordinal(invalidMessage, index)
                }

                return (
                    <SingularSpecControl {...{
                        arrayedPropertyIndex: index,
                        displayedSpecValue: value,
                        invalidMessage,
                        key: from.Ordinal(index),
                        specControlsProps,
                        specKey,
                        specPropertyAttributes,
                        submittedSpecValue: submittedSpecValues && apply.Ordinal(submittedSpecValues, index),
                    }}/>
                )
            },
        )

        return (
            <div {...{ id: specKey, className: 'arrayed-spec-control' }}>
                <span {...{ className: SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL }}>
                    {stringifyIfNecessary(submittedSpecValues)}
                </span>
                <div>{specPropertyAttributes.formattedName || camelCaseToLowerCase(specKey)}</div>
                {controls}
                <div>
                    <AddButton {...{ specKey, specState: specControlsProps.specState }}/>
                    <RemoveButton {...{ specKey, specState: specControlsProps.specState }}/>
                </div>
            </div>
        )
    }

export default ArrayedSpecControl
