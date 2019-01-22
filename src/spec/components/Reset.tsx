import { Spec } from '@musical-patterns/pattern'
import { deepEqual } from '@musical-patterns/utilities'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { ImmutableRootState, RootStateKeys } from '../../root'
import { handleReset } from '../events'
import { SpecStateKeys } from '../state'
import { ResetProps, ResetPropsFromDispatch, ResetPropsFromState } from './types'

const mapStateToProps: (state: ImmutableRootState) => ResetPropsFromState =
    (state: ImmutableRootState): ResetPropsFromState => ({
        defaultSpec: state.get(RootStateKeys.SPEC)
            .get(SpecStateKeys.DEFAULT_SPEC),
        submittedSpec: state.get(RootStateKeys.SPEC)
            .get(SpecStateKeys.SUBMITTED_SPEC),
    })

const mapDispatchToProps: (dispatch: Dispatch) => ResetPropsFromDispatch =
    (dispatch: Dispatch): ResetPropsFromDispatch => ({
        resetHandler: (spec: Spec): void => {
            handleReset({ dispatch, spec })
        },
    })

const Reset: (props: ResetProps) => JSX.Element =
    ({ resetHandler, submittedSpec, defaultSpec }: ResetProps): JSX.Element => {
        const onClick: VoidFunction = (): void => {
            resetHandler(defaultSpec)
        }

        const disabled: boolean = deepEqual(submittedSpec, defaultSpec)

        return (
            <button {...{ id: 'reset', onClick, disabled }}>reset all</button>
        )
    }

export default connect(mapStateToProps, mapDispatchToProps)(Reset)
