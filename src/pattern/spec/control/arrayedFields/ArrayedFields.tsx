// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect no-null-keyword

import { ArrayedDomSpecValue, computeArrayedDomSpecValue } from '@musical-patterns/spec'
import { as, indexOfFinalElement, INITIAL, NEXT, Ordinal, use } from '@musical-patterns/utilities'
import * as React from 'react'
import { connect } from 'react-redux'
import { ImmutableState, StateKey } from '../../../../types'
import { PatternStateKey } from '../../../types'
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
        const arrayedDisplayedValue: ArrayedDomSpecValue = computeArrayedDomSpecValue(displayedSpecs, specKey)
        const fields: Array<React.ReactElement | null> = []
        for (
            let fieldIndex: Ordinal = INITIAL;
            fieldIndex <= indexOfFinalElement(arrayedDisplayedValue);
            fieldIndex = use.Cardinal(fieldIndex, NEXT)
        ) {
            fields.push(<Field {...{ fieldIndex, key: as.number(fieldIndex), specKey }}/>)
        }

        return (
            <div {...{ className: 'arrayed-fields' }}>
                {fields}
            </div>
        )
    }

export default connect(mapStateToProps)(ArrayedFields)
