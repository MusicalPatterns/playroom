// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect

import { Spec } from '@musical-patterns/pattern'
import { deepEqual } from '@musical-patterns/utilities'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { RESET_ALL } from '../../../copy'
import { ImmutableState, StateKey } from '../../../types'
import { SpecStateKey } from '../../types'
import { handleReset } from './events'
import './styles'
import { ResetProps, ResetPropsFromDispatch, ResetPropsFromState } from './types'

const mapStateToProps: (state: ImmutableState) => ResetPropsFromState =
    (state: ImmutableState): ResetPropsFromState => ({
        initialSpec: state.get(StateKey.SPEC)
            .get(SpecStateKey.INITIAL_SPEC),
        submittedSpec: state.get(StateKey.SPEC)
            .get(SpecStateKey.SUBMITTED_SPEC),
    })

const mapDispatchToProps: (dispatch: Dispatch) => ResetPropsFromDispatch =
    (dispatch: Dispatch): ResetPropsFromDispatch => ({
        resetHandler: (spec: Spec): void => {
            handleReset({ dispatch, spec })
        },
    })

const ResetButton: React.ComponentType<ResetProps> =
    ({ resetHandler, submittedSpec, initialSpec }: ResetProps): JSX.Element => {
        const onClick: VoidFunction = (): void => {
            resetHandler(initialSpec)
        }

        const disabled: boolean = deepEqual(submittedSpec, initialSpec)

        return (
            <button {...{ id: 'reset', onClick, disabled }}>{RESET_ALL}</button>
        )
    }

export default connect(mapStateToProps, mapDispatchToProps)(ResetButton)
