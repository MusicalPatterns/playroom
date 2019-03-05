import { InvalidSpecMessage } from '@musical-patterns/pattern'
import { apply, camelCaseToLowerCase, from, map, Ordinal } from '@musical-patterns/utilities'
import * as React from 'react'
import { DomValueOrChecked, SecretSelectorsForTest } from '../../../types'
import { stringifyIfNecessary } from '../helpers'
import SingularSpecControl from '../SingularSpecControl'
import AddButton from './AddButton'
import RemoveButton from './RemoveButton'
import { ArrayedSpecControlProps } from './types'

const ArrayedSpecControl: React.ComponentType<ArrayedSpecControlProps> =
    (props: ArrayedSpecControlProps): JSX.Element => {
        const {
            displayedSpecValues,
            submittedSpecValues,
            specValidationResults,
            specKey,
            specControlsProps,
            specPropertyAttributes,
        } = props

        const controls: JSX.Element[] = map(
            displayedSpecValues,
            (value: DomValueOrChecked, index: Ordinal): JSX.Element => {
                let invalidSpecMessage: InvalidSpecMessage = specValidationResults[ specKey ]
                if (invalidSpecMessage && invalidSpecMessage instanceof Array) {
                    invalidSpecMessage = apply.Ordinal(invalidSpecMessage, index)
                }

                const key: number = from.Ordinal(index)

                return (
                    <div {...{ className: 'numbered-spec-control', key }}>
                        <span>{key}</span>
                        <SingularSpecControl {...{
                            arrayedPropertyIndex: index,
                            displayedSpecValue: value,
                            invalidSpecMessage,
                            specControlsProps,
                            specKey,
                            specPropertyAttributes,
                            submittedSpecValue: submittedSpecValues && apply.Ordinal(submittedSpecValues, index),
                        }}/>
                    </div>
                )
            },
        )

        return (
            <div {...{ id: specKey, className: 'arrayed-spec-control' }}>
                <span {...{ className: SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL }}>
                    {stringifyIfNecessary(submittedSpecValues)}
                </span>
                <div>{specPropertyAttributes.formattedName || camelCaseToLowerCase(specKey)}</div>
                <div {...{ className: 'arrayed-fields' }}>
                    {controls}
                </div>
                <div>
                    <AddButton {...{ specKey, specState: specControlsProps.specState }}/>
                    <RemoveButton {...{ specKey, specState: specControlsProps.specState }}/>
                </div>
            </div>
        )
    }

export default ArrayedSpecControl
