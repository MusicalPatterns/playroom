// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect no-null-keyword

import { SingularValidation } from '@musical-patterns/pattern'
import * as React from 'react'
import { connect } from 'react-redux'
import { ImmutableState, StateKey } from '../../../types'
import { computeSingularValidation } from '../../singularValues'
import { SpecStateKey } from '../../types'
import './styles'
import { InvalidMessageProps, InvalidMessagePropsFromState } from './types'

const mapStateToProps: (state: ImmutableState) => InvalidMessagePropsFromState =
    (state: ImmutableState): InvalidMessagePropsFromState => ({
        validations: state.get(StateKey.SPEC)
            .get(SpecStateKey.VALIDATIONS),
    })

const InvalidMessage: React.ComponentType<InvalidMessageProps> =
    (invalidMessageProps: InvalidMessageProps): React.ReactElement | null => {
        const singularValidation: SingularValidation = computeSingularValidation(invalidMessageProps)

        return singularValidation ? <div {...{ className: 'invalid-message' }}>{singularValidation}</div> : null
    }

export default connect(mapStateToProps)(InvalidMessage)
