import { camelCaseToLowerCase, to } from '@musical-patterns/utilities'
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

        const controls: JSX.Element[] = displayedSpecValues.map(
            (value: DomValueOrChecked, index: number): JSX.Element => {
                let invalidMessage: InvalidSpecMessage = invalidMessages[ specKey ]
                if (invalidMessage && invalidMessage instanceof Array) {
                    invalidMessage = invalidMessage[ index ]
                }

                return (
                    <SingularSpecControl {...{
                        arrayedPropertyIndex: to.Index(index),
                        displayedSpecValue: value,
                        invalidMessage,
                        key: index,
                        specControlsProps,
                        specKey,
                        specPropertyAttributes,
                        submittedSpecValue: submittedSpecValues[ index ],
                    }}/>
                )
            },
        )

        return (
            <div {...{ id: specKey, className: 'arrayed-control' }}>
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
