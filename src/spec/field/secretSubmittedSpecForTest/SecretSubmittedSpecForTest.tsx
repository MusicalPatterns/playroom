// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect no-null-keyword

import * as React from 'react'
import { connect } from 'react-redux'
import { PageStateKey } from '../../../page'
import { ImmutableState, SecretTestSelector, StateKey } from '../../../types'
import { stringifyIfNecessary } from './stringifyIfNecessary'
import { SecretSubmittedSpecForTestProps, SecretSubmittedSpecForTestPropsFromState } from './types'

const mapStateToProps: (state: ImmutableState) => SecretSubmittedSpecForTestPropsFromState =
    (state: ImmutableState): SecretSubmittedSpecForTestPropsFromState => ({
        debugMode: state.get(StateKey.PAGE)
            .get(PageStateKey.DEBUG_MODE),
    })

const SecretSubmittedSpecForTest: React.ComponentType<SecretSubmittedSpecForTestProps> =
    ({ debugMode, fieldId, submittedValue }: SecretSubmittedSpecForTestProps): React.ReactElement | null => {
        if (!debugMode) {
            return null
        }

        return (
            <span
                {...{
                    className: SecretTestSelector.SUBMITTED_SPEC,
                    id: fieldId,
                }}
            >
                {stringifyIfNecessary(submittedValue)}
            </span>
        )
    }

export default connect(mapStateToProps)(SecretSubmittedSpecForTest)
