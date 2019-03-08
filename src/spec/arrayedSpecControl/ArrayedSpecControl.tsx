// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect

import { ArrayedSpecValue, InvalidSpecMessage, SingularSpecValue } from '@musical-patterns/pattern'
import {
    apply,
    camelCaseToLowerCase,
    DomValueOrChecked,
    from,
    indexOfLastElement,
    map,
    Ordinal,
} from '@musical-patterns/utilities'
import * as React from 'react'
import { SecretSelectorsForTest } from '../../types'
import { AddButton } from '../addButton'
import { RemoveButton } from '../removeButton'
import { SingularSpecControl } from '../singularSpecControl'
import { stringifyIfNecessary } from '../stringifyIfNecessary'
import './styles'
import { ArrayedSpecControlProps } from './types'

const calculateSubmittedSpecValue: (submittedSpecValues: ArrayedSpecValue, index: Ordinal) => SingularSpecValue =
    (submittedSpecValues: ArrayedSpecValue, index: Ordinal): SingularSpecValue => {
        if (index > indexOfLastElement(submittedSpecValues)) {
            return undefined
        }

        return apply.Ordinal(submittedSpecValues, index)
    }

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
                let invalidSpecMessage: InvalidSpecMessage = specValidationResults && specValidationResults[ specKey ]
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
                            submittedSpecValue: calculateSubmittedSpecValue(submittedSpecValues, index),
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
