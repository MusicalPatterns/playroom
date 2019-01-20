import { Spec } from '@musical-patterns/pattern'
import { deepEqual } from '@musical-patterns/utilities'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { ImmutableRootState, RootStateKeys } from '../../root'
import { handleReset } from '../events'
import { ImmutableSpecState, SpecStateKeys } from '../state'
import Presets from './Presets'
import SpecControls from './SpecControls'
import { SpecProps, SpecPropsFromDispatch, SpecPropsFromState } from './types'

const mapStateToProps: (state: ImmutableRootState) => SpecPropsFromState =
    (state: ImmutableRootState): SpecPropsFromState => {
        const specState: ImmutableSpecState = state.get(RootStateKeys.SPEC)

        return {
            defaultSpec: specState
                .get(SpecStateKeys.DEFAULT_SPEC),
            presets: specState
                .get(SpecStateKeys.PRESETS),
            submittedSpec: specState
                .get(SpecStateKeys.SUBMITTED_SPEC),
        }
    }

const mapDispatchToProps: (dispatch: Dispatch) => SpecPropsFromDispatch =
    (dispatch: Dispatch): SpecPropsFromDispatch => ({
        resetHandler: (spec: Spec): void => {
            handleReset({ dispatch, spec })
        },
    })

const SpecComponent: (specProps: SpecProps) => JSX.Element =
    (props: SpecProps): JSX.Element => {
        const { defaultSpec, submittedSpec, presets, resetHandler } = props
        const onClick: VoidFunction = (): void => {
            resetHandler(defaultSpec)
        }

        const disabled: boolean = deepEqual(submittedSpec, defaultSpec)

        return (
            <div {...{ id: 'pattern-spec' }}>
                <h3>controls</h3>
                {presets && <Presets {...{ presets, submittedSpec }}/>}
                <hr/>
                <SpecControls/>
                <hr/>
                <button {...{ id: 'reset', onClick, disabled }}>reset all</button>
            </div>
        )
    }

export default connect(mapStateToProps, mapDispatchToProps)(SpecComponent)
