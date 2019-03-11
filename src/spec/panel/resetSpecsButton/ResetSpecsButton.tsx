// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect no-null-keyword

import { Specs } from '@musical-patterns/pattern'
import { deepEqual } from '@musical-patterns/utilities'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { RESET_ALL } from '../../../copy'
import { ImmutableState, StateKey } from '../../../types'
import { ImmutableSpecState, SpecStateKey } from '../../types'
import { handleSpecsReset } from './events'
import './styles'
import { ResetSpecsButtonProps, ResetSpecsButtonPropsFromDispatch, ResetSpecsButtonPropsFromState } from './types'

const mapStateToProps: (state: ImmutableState) => ResetSpecsButtonPropsFromState =
    (state: ImmutableState): ResetSpecsButtonPropsFromState => {
        const specState: ImmutableSpecState = state.get(StateKey.SPEC)

        return {
            initialSpecs: specState.get(SpecStateKey.INITIAL_SPECS),
            submittedSpecs: specState.get(SpecStateKey.SUBMITTED_SPECS),
        }
    }

const mapDispatchToProps: (dispatch: Dispatch) => ResetSpecsButtonPropsFromDispatch =
    (dispatch: Dispatch): ResetSpecsButtonPropsFromDispatch => ({
        handleSpecsResetEvent: (specs: Specs): void => {
            handleSpecsReset({ dispatch, specs })
        },
    })

const ResetSpecsButton: React.ComponentType<ResetSpecsButtonProps> =
    ({ handleSpecsResetEvent, submittedSpecs, initialSpecs }: ResetSpecsButtonProps): React.ReactElement | null => {
        const onClick: VoidFunction = (): void => {
            handleSpecsResetEvent(initialSpecs)
        }

        const disabled: boolean = deepEqual(submittedSpecs, initialSpecs)

        return (
            <button {...{ id: 'reset-spec', onClick, disabled }}>{RESET_ALL}</button>
        )
    }

export default connect(mapStateToProps, mapDispatchToProps)(ResetSpecsButton)
