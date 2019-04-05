// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect no-null-keyword

import { isUndefined } from '@musical-patterns/utilities'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { ImmutableState, StateKey } from '../../../types'
import { PatternStateKey } from '../../types'
import { ImmutableMaterialState, MaterialStateKey } from '../types'
import { computeSetToggleImmersiveAudioHandlers } from './events'
import {
    computeToggleImmersiveAudioButtonHoverText,
    computeToggleImmersiveAudioButtonOnClick,
    computeToggleImmersiveAudioButtonText,
    computeToggleImmersiveAudioDisabled,
} from './helpers'
import './styles'
import {
    ToggleImmersiveAudioButtonProps,
    ToggleImmersiveAudioButtonPropsFromDispatch,
    ToggleImmersiveAudioButtonPropsFromState,
} from './types'

const mapStateToProps: (state: ImmutableState) => ToggleImmersiveAudioButtonPropsFromState =
    (state: ImmutableState): ToggleImmersiveAudioButtonPropsFromState => {
        const materialState: ImmutableMaterialState = state.get(StateKey.PATTERN)
            .get(PatternStateKey.MATERIAL)

        return {
            immersiveAudioEnabled: materialState.get(MaterialStateKey.IMMERSIVE_AUDIO_ENABLED),
            immersiveAudioReady: materialState.get(MaterialStateKey.IMMERSIVE_AUDIO_READY),
            immersiveAudioUnavailable: materialState.get(MaterialStateKey.IMMERSIVE_AUDIO_UNAVAILABLE),
            performerDisabled: materialState.get(MaterialStateKey.PERFORMER_DISABLED),
            toggleImmersiveAudioHandlers: materialState.get(MaterialStateKey.TOGGLE_IMMERSIVE_AUDIO_HANDLERS),
        }
    }

const mapDispatchToProps: (dispatch: Dispatch) => ToggleImmersiveAudioButtonPropsFromDispatch =
    (dispatch: Dispatch): ToggleImmersiveAudioButtonPropsFromDispatch => ({
        setToggleImmersiveAudioHandlers: computeSetToggleImmersiveAudioHandlers({ dispatch }),
    })

const ToggleImmersiveAudioButton: React.ComponentType<ToggleImmersiveAudioButtonProps> =
    (
        {
            immersiveAudioEnabled,
            immersiveAudioReady,
            immersiveAudioUnavailable,
            performerDisabled,
            setToggleImmersiveAudioHandlers,
            toggleImmersiveAudioHandlers,
        }: ToggleImmersiveAudioButtonProps,
    ): React.ReactElement | null => {
        if (isUndefined(toggleImmersiveAudioHandlers)) {
            setToggleImmersiveAudioHandlers()
        }

        return (
            <button
                {...{
                    disabled: computeToggleImmersiveAudioDisabled({ immersiveAudioReady, performerDisabled }),
                    id: 'toggle-immersive-audio',
                    onClick: computeToggleImmersiveAudioButtonOnClick({
                        immersiveAudioEnabled,
                        toggleImmersiveAudioHandlers,
                    }),
                    title: computeToggleImmersiveAudioButtonHoverText({ immersiveAudioUnavailable }),
                }}
            >
                {computeToggleImmersiveAudioButtonText({ immersiveAudioEnabled })}
            </button>
        )
    }

export default connect(mapStateToProps, mapDispatchToProps)(ToggleImmersiveAudioButton)
