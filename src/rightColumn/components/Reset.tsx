import { Spec } from '@musical-patterns/pattern'
import { deepEqual } from '@musical-patterns/utilities'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { RESET_ALL } from '../../copy'
import { ImmutableRootState, RootStateKey } from '../../root'
import { handleReset } from '../events'
import { RightColumnStateKey } from '../state'
import { ResetProps, ResetPropsFromDispatch, ResetPropsFromState } from './types'

const mapStateToProps: (state: ImmutableRootState) => ResetPropsFromState =
    (state: ImmutableRootState): ResetPropsFromState => ({
        initialSpec: state.get(RootStateKey.RIGHT_COLUMN)
            .get(RightColumnStateKey.INITIAL_SPEC),
        submittedSpec: state.get(RootStateKey.RIGHT_COLUMN)
            .get(RightColumnStateKey.SUBMITTED_SPEC),
    })

const mapDispatchToProps: (dispatch: Dispatch) => ResetPropsFromDispatch =
    (dispatch: Dispatch): ResetPropsFromDispatch => ({
        resetHandler: (spec: Spec): void => {
            handleReset({ dispatch, spec })
        },
    })

const Reset: React.ComponentType<ResetProps> =
    ({ resetHandler, submittedSpec, initialSpec }: ResetProps): JSX.Element => {
        const onClick: VoidFunction = (): void => {
            resetHandler(initialSpec)
        }

        const disabled: boolean = deepEqual(submittedSpec, initialSpec)

        return (
            <button {...{ id: 'reset', onClick, disabled }}>{RESET_ALL}</button>
        )
    }

export default connect(mapStateToProps, mapDispatchToProps)(Reset)
