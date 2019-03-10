// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect no-null-keyword

import { isUndefined } from '@musical-patterns/utilities'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { ImmutableState, StateKey } from '../../types'
import { ImmutableMaterialState, MaterialStateKey } from '../types'
import { buildSetToggleImmersiveAudioHandlers } from './events'
import {
    getToggleImmersiveAudioButtonHoverText,
    getToggleImmersiveAudioButtonOnClick,
    getToggleImmersiveAudioButtonText,
    getToggleImmersiveAudioDisabled,
} from './helpers'
import './styles'
import {
    ToggleImmersiveAudioButtonProps,
    ToggleImmersiveAudioButtonPropsFromDispatch,
    ToggleImmersiveAudioButtonPropsFromState,
} from './types'

const mapStateToProps: (state: ImmutableState) => ToggleImmersiveAudioButtonPropsFromState =
    (state: ImmutableState): ToggleImmersiveAudioButtonPropsFromState => {
        const materialState: ImmutableMaterialState = state.get(StateKey.MATERIAL)

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
        setToggleImmersiveAudioHandlers: buildSetToggleImmersiveAudioHandlers({ dispatch }),
    })

const ToggleImmersiveAudioButton: React.ComponentType<ToggleImmersiveAudioButtonProps> =
    (props: ToggleImmersiveAudioButtonProps): React.ReactElement | null => {
        const {
            immersiveAudioEnabled,
            immersiveAudioReady,
            immersiveAudioUnavailable,
            performerDisabled,
            setToggleImmersiveAudioHandlers,
            toggleImmersiveAudioHandlers,
        } = props

        if (isUndefined(toggleImmersiveAudioHandlers)) {
            setToggleImmersiveAudioHandlers()
        }

        return (
            <button
                {...{
                    disabled: getToggleImmersiveAudioDisabled({ immersiveAudioReady, performerDisabled }),
                    id: 'toggle-immersive-audio',
                    onClick: getToggleImmersiveAudioButtonOnClick({
                        immersiveAudioEnabled,
                        toggleImmersiveAudioHandlers,
                    }),
                    title: getToggleImmersiveAudioButtonHoverText({ immersiveAudioUnavailable }),
                }}
            >
                {getToggleImmersiveAudioButtonText({ immersiveAudioEnabled })}
            </button>
        )
    }

export default connect(mapStateToProps, mapDispatchToProps)(ToggleImmersiveAudioButton)
