// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect no-null-keyword

import { ArrayedDomSpecValue } from '@musical-patterns/spec'
import { apply, from, indexOfFinalElement, INITIAL, NEXT, Ordinal } from '@musical-patterns/utilities'
import * as React from 'react'
import { connect } from 'react-redux'
import { ImmutableState, StateKey } from '../../../../types'
import { PatternStateKey } from '../../../types'
import { computeArrayedDisplayedValue } from '../../arrayedValues'
import { Field } from '../../field'
import { SpecStateKey } from '../../types'
import './styles'
import { ArrayedFieldsProps, ArrayedFieldsPropsFromState } from './types'

const mapStateToProps: (state: ImmutableState) => ArrayedFieldsPropsFromState =
    (state: ImmutableState): ArrayedFieldsPropsFromState => ({
        displayedSpecs: state.get(StateKey.PATTERN)
            .get(PatternStateKey.SPEC)
            .get(SpecStateKey.DISPLAYED_SPECS),
    })

const ArrayedFields: React.ComponentType<ArrayedFieldsProps> =
    ({ displayedSpecs, specKey }: ArrayedFieldsProps): React.ReactElement | null => {
        const arrayedDisplayedValue: ArrayedDomSpecValue = computeArrayedDisplayedValue(displayedSpecs, specKey)
        const fields: Array<React.ReactElement | null> = []
        for (
            let fieldIndex: Ordinal = INITIAL;
            fieldIndex <= indexOfFinalElement(arrayedDisplayedValue);
            fieldIndex = apply.Translation(fieldIndex, NEXT)
        ) {
            fields.push(<Field {...{ fieldIndex, key: from.Ordinal(fieldIndex), specKey }}/>)
        }

        return (
            <div {...{ className: 'arrayed-fields' }}>
                {fields}
            </div>
        )
    }

export default connect(mapStateToProps)(ArrayedFields)
