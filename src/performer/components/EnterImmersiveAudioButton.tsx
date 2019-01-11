import * as React from 'react'
import { connect } from 'react-redux'
import { ImmutableRootState, RootStateKeys } from '../../root'
import { PerformerStateKeys } from '../state'
import { EnterImmersiveAudioButtonProps, EnterImmersiveAudioButtonPropsFromState } from './types'

const mapStateToProps: (state: ImmutableRootState) => EnterImmersiveAudioButtonPropsFromState =
    (state: ImmutableRootState): EnterImmersiveAudioButtonPropsFromState => ({
        enterImmersiveAudioHandler: state.get(RootStateKeys.PERFORMER)
            .get(PerformerStateKeys.ENTER_IMMERSIVE_AUDIO_HANDLER),
    })

const EnterImmersiveAudioButton: (props: EnterImmersiveAudioButtonProps) => JSX.Element =
    ({ disabled, enterImmersiveAudioHandler }: EnterImmersiveAudioButtonProps): JSX.Element =>
        <button {...{ onClick: enterImmersiveAudioHandler, id: 'enter-immersive-audio', disabled }}>
            enter immersive audio
        </button>

export default connect(mapStateToProps)(EnterImmersiveAudioButton)
