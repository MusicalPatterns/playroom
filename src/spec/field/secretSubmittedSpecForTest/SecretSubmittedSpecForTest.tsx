// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect

import * as React from 'react'
import { connect } from 'react-redux'
import { PageStateKey } from '../../../page'
import { ImmutableState, SecretTestSelectors, StateKey } from '../../../types'
import { stringifyIfNecessary } from './stringifyIfNecessary'
import { SecretSubmittedSpecForTestProps, SecretSubmittedSpecForTestPropsFromState } from './types'

const mapStateToProps: (state: ImmutableState) => SecretSubmittedSpecForTestPropsFromState =
    (state: ImmutableState): SecretSubmittedSpecForTestPropsFromState => ({
        debugMode: state.get(StateKey.PAGE)
            .get(PageStateKey.DEBUG_MODE),
    })

const SecretSubmittedSpecForTest: React.ComponentType<SecretSubmittedSpecForTestProps> =
    ({ debugMode, fieldId, submittedValue }: SecretSubmittedSpecForTestProps): JSX.Element =>
        <span>
            {debugMode && <span {...{ id: fieldId, className: SecretTestSelectors.SUBMITTED_SPEC }}>
                {stringifyIfNecessary(submittedValue)}
            </span>}
        </span>

export default connect(mapStateToProps)(SecretSubmittedSpecForTest)
