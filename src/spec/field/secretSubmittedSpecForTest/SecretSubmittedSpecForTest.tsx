// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect no-null-keyword

import { Value } from '@musical-patterns/pattern'
import { isUndefined } from '@musical-patterns/utilities'
import * as React from 'react'
import { connect } from 'react-redux'
import { PageStateKey } from '../../../page'
import { ImmutableState, SecretTestSelector, StateKey } from '../../../types'
import { computeArrayedSubmittedValue } from '../../arrayedValues'
import { computeSingularSubmittedValue } from '../../singularValues'
import { isArrayedSubmittedValue } from '../../typeGuards'
import { SpecStateKey } from '../../types'
import { computeFieldId } from '../helpers'
import { stringifyIfNecessary } from './stringifyIfNecessary'
import { SecretSubmittedSpecForTestProps, SecretSubmittedSpecForTestPropsFromState } from './types'

const mapStateToProps: (state: ImmutableState) => SecretSubmittedSpecForTestPropsFromState =
    (state: ImmutableState): SecretSubmittedSpecForTestPropsFromState => ({
        debugMode: state.get(StateKey.PAGE)
            .get(PageStateKey.DEBUG_MODE),
        submittedSpec: state.get(StateKey.SPEC)
            .get(SpecStateKey.SUBMITTED_SPEC),
    })

const SecretSubmittedSpecForTest: React.ComponentType<SecretSubmittedSpecForTestProps> =
    (secretSubmittedSpecForTestProps: SecretSubmittedSpecForTestProps): React.ReactElement | null => {
        const { debugMode, property, submittedSpec, fieldIndex } = secretSubmittedSpecForTestProps
        if (!debugMode) {
            return null
        }
        const fieldId: string = computeFieldId({ fieldIndex, property })

        const submittedValue: Value = isArrayedSubmittedValue(submittedSpec[ property ]) && isUndefined(fieldIndex) ?
            computeArrayedSubmittedValue(submittedSpec, property) :
            computeSingularSubmittedValue({ submittedSpec, property, fieldIndex })

        return (
            <span{...{ className: SecretTestSelector.SUBMITTED_SPEC, id: fieldId }}>
                {stringifyIfNecessary(submittedValue)}
            </span>
        )
    }

export default connect(mapStateToProps)(SecretSubmittedSpecForTest)
