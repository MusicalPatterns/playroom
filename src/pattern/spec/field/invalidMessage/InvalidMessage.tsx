// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect no-null-keyword

import { computeSingularValidation, SingularValidation } from '@musical-patterns/spec'
import * as React from 'react'
import { connect } from 'react-redux'
import { ImmutableState, StateKey } from '../../../../types'
import { PatternStateKey } from '../../../types'
import { SpecStateKey } from '../../types'
import './styles'
import { InvalidMessageProps, InvalidMessagePropsFromState } from './types'

const mapStateToProps: (state: ImmutableState) => InvalidMessagePropsFromState =
    (state: ImmutableState): InvalidMessagePropsFromState => ({
        validations: state.get(StateKey.PATTERN)
            .get(PatternStateKey.SPEC)
            .get(SpecStateKey.VALIDATIONS),
    })

const InvalidMessage: React.ComponentType<InvalidMessageProps> =
    ({ fieldIndex, specKey, validations }: InvalidMessageProps): React.ReactElement | null => {
        const singularValidation: SingularValidation = computeSingularValidation({
            fieldIndex,
            validation: validations && validations[ specKey ],
        })

        return singularValidation ? <div {...{ className: 'invalid-message' }}>{singularValidation}</div> : null
    }

export default connect(mapStateToProps)(InvalidMessage)
