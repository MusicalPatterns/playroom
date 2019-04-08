// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect no-null-keyword

import { isArrayedSpecValue, SpecValue } from '@musical-patterns/spec'
import { isUndefined } from '@musical-patterns/utilities'
import * as React from 'react'
import { connect } from 'react-redux'
import { PageStateKey } from '../../../../page'
import { ImmutableState, SecretTestSelector, StateKey } from '../../../../types'
import { PatternStateKey } from '../../../types'
import { computeArrayedSubmittedValue } from '../../arrayedValues'
import { computeSingularSubmittedValue } from '../../singularValues'
import { SpecStateKey } from '../../types'
import { computeFieldId } from '../attributes'
import { stringifyIfNecessary } from './stringifyIfNecessary'
import { SecretSubmittedSpecsForTestProps, SecretSubmittedSpecsForTestPropsFromState } from './types'

const mapStateToProps: (state: ImmutableState) => SecretSubmittedSpecsForTestPropsFromState =
    (state: ImmutableState): SecretSubmittedSpecsForTestPropsFromState => ({
        debugMode: state.get(StateKey.PAGE)
            .get(PageStateKey.DEBUG_MODE),
        submittedSpecs: state.get(StateKey.PATTERN)
            .get(PatternStateKey.SPEC)
            .get(SpecStateKey.SUBMITTED_SPECS),
    })

const SecretSubmittedSpecForTest: React.ComponentType<SecretSubmittedSpecsForTestProps> =
    (
        {
            debugMode,
            specKey,
            submittedSpecs,
            fieldIndex,
        }: SecretSubmittedSpecsForTestProps,
    ): React.ReactElement | null => {
        if (!debugMode) {
            return null
        }
        const fieldId: string = computeFieldId({ fieldIndex, specKey })

        const submittedValue: SpecValue =
            isArrayedSpecValue(submittedSpecs[ specKey ]) && isUndefined(fieldIndex) ?
                computeArrayedSubmittedValue(submittedSpecs, specKey) :
                computeSingularSubmittedValue({ submittedSpecs, specKey, fieldIndex })

        return (
            <span{...{ className: SecretTestSelector.SUBMITTED_SPEC, id: fieldId }}>
                {stringifyIfNecessary(submittedValue)}
            </span>
        )
    }

export default connect(mapStateToProps)(SecretSubmittedSpecForTest)
