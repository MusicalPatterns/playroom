// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect no-null-keyword

import { SingularValidationResult } from '@musical-patterns/pattern'
import * as React from 'react'
import { connect } from 'react-redux'
import { ImmutableState, StateKey } from '../../../types'
import { computeSingularValidationResult } from '../../singularValues'
import { SpecStateKey } from '../../types'
import './styles'
import { InvalidMessageProps, InvalidMessagePropsFromState } from './types'

const mapStateToProps: (state: ImmutableState) => InvalidMessagePropsFromState =
    (state: ImmutableState): InvalidMessagePropsFromState => ({
        validationResults: state.get(StateKey.SPEC)
            .get(SpecStateKey.VALIDATION_RESULTS),
    })

const InvalidMessage: React.ComponentType<InvalidMessageProps> =
    (invalidMessageProps: InvalidMessageProps): React.ReactElement | null => {
        const singularValidationResult: SingularValidationResult = computeSingularValidationResult(invalidMessageProps)

        return singularValidationResult ?
            <div {...{ className: 'invalid-message' }}>{singularValidationResult}</div> :
            null
    }

export default connect(mapStateToProps)(InvalidMessage)
