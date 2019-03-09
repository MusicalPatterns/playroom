// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect

import { from, HtmlValueOrChecked, map, Ordinal } from '@musical-patterns/utilities'
import * as React from 'react'
import { Field } from '../../field'
import { ArrayedSpecControlPropsFromParent } from '../arrayedSpecControl'
import { calculateSingularSubmittedValue, calculateSingularValidationResult } from './calculateSingular'
import './styles'

const ArrayedFields: React.ComponentType<ArrayedSpecControlPropsFromParent> =
    (arrayedFieldsProps: ArrayedSpecControlPropsFromParent): JSX.Element => {
        const { property, arrayedDisplayedValue, arrayedValidationResult, arrayedSubmittedValue } = arrayedFieldsProps

        const fields: JSX.Element[] = map(
            arrayedDisplayedValue,
            (singularDisplayedValue: HtmlValueOrChecked, index: Ordinal): JSX.Element =>
                <Field {...{
                    fieldIndex: index,
                    key: from.Ordinal(index),
                    property,
                    singularDisplayedValue,
                    singularSubmittedValue:
                        calculateSingularSubmittedValue(arrayedSubmittedValue, index),
                    singularValidationResult: calculateSingularValidationResult(arrayedValidationResult, index),
                }}/>,
        )

        return (
            <div {...{ className: 'arrayed-fields' }}>
                {fields}
            </div>
        )
    }

export default ArrayedFields
