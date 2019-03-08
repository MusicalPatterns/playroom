// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect

import { Spec } from '@musical-patterns/pattern'
import { deepEqual } from '@musical-patterns/utilities'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { RESET_ALL } from '../../../copy'
import { ImmutableState, StateKey } from '../../../types'
import { ImmutableSpecState, SpecStateKey } from '../../types'
import { handleSpecReset } from './events'
import './styles'
import { ResetSpecButtonProps, ResetSpecButtonPropsFromDispatch, ResetSpecButtonPropsFromState } from './types'

const mapStateToProps: (state: ImmutableState) => ResetSpecButtonPropsFromState =
    (state: ImmutableState): ResetSpecButtonPropsFromState => {
        const specState: ImmutableSpecState = state.get(StateKey.SPEC)

        return {
            initialSpec: specState.get(SpecStateKey.INITIAL_SPEC),
            submittedSpec: specState.get(SpecStateKey.SUBMITTED_SPEC),
        }
    }

const mapDispatchToProps: (dispatch: Dispatch) => ResetSpecButtonPropsFromDispatch =
    (dispatch: Dispatch): ResetSpecButtonPropsFromDispatch => ({
        handleSpecResetEvent: (spec: Spec): void => {
            handleSpecReset({ dispatch, spec })
        },
    })

const ResetSpecButton: React.ComponentType<ResetSpecButtonProps> =
    ({ handleSpecResetEvent, submittedSpec, initialSpec }: ResetSpecButtonProps): JSX.Element => {
        const onClick: VoidFunction = (): void => {
            handleSpecResetEvent(initialSpec)
        }

        const disabled: boolean = deepEqual(submittedSpec, initialSpec)

        return (
            <button {...{ id: 'reset-spec', onClick, disabled }}>{RESET_ALL}</button>
        )
    }

export default connect(mapStateToProps, mapDispatchToProps)(ResetSpecButton)
