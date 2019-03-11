// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect no-null-keyword

import { ArrayedDomValue, DomValue } from '@musical-patterns/pattern'
import {
    apply,
    from,
    indexOfLastElement,
    INITIAL,
    isUndefined,
    Maybe,
    NEXT,
    Ordinal,
} from '@musical-patterns/utilities'
import * as React from 'react'
import { connect } from 'react-redux'
import { ImmutableState, StateKey } from '../../../types'
import { Field } from '../../field'
import { isArrayedDisplayedValue } from '../../typeGuards'
import { SpecStateKey } from '../../types'
import './styles'
import { ArrayedFieldsProps, ArrayedFieldsPropsFromState } from './types'

const mapStateToProps: (state: ImmutableState) => ArrayedFieldsPropsFromState =
    (state: ImmutableState): ArrayedFieldsPropsFromState => ({
        displayedSpec: state.get(StateKey.SPEC)
            .get(SpecStateKey.DISPLAYED_SPEC),
    })

const ArrayedFields: React.ComponentType<ArrayedFieldsProps> =
    ({ displayedSpec, property }: ArrayedFieldsProps): React.ReactElement | null => {
        const displayedValue: Maybe<DomValue> = displayedSpec[ property ]
        if (isUndefined(displayedValue)) {
            return null
        }
        if (!isArrayedDisplayedValue(displayedValue)) {
            return null
        }
        const arrayedDisplayedValue: ArrayedDomValue = displayedValue

        const fields: Array<React.ReactElement | null> = []
        for (
            let fieldIndex: Ordinal = INITIAL;
            fieldIndex <= indexOfLastElement(arrayedDisplayedValue);
            fieldIndex = apply.Translation(fieldIndex, NEXT)
        ) {
            fields.push(<Field {...{ fieldIndex, key: from.Ordinal(fieldIndex), property }}/>)
        }

        return (
            <div {...{ className: 'arrayed-fields' }}>
                {fields}
            </div>
        )
    }

export default connect(mapStateToProps)(ArrayedFields)
