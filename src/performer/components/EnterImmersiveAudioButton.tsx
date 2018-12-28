import * as React from 'react'
import { connect } from 'react-redux'
import { ImmutableRootState, RootStateKeys } from '../../root'
import { PerformerStateKeys } from '../state'
import { EnterImmersiveAudioButtonProps } from './types'

const mapStateToProps: (state: ImmutableRootState) => EnterImmersiveAudioButtonProps =
    (state: ImmutableRootState): EnterImmersiveAudioButtonProps => ({
        enterImmersiveAudioHandler: state.get(RootStateKeys.PERFORMER)
            .get(PerformerStateKeys.ENTER_IMMERSIVE_AUDIO_HANDLER),
    })

const EnterImmersiveAudioButton: (props: EnterImmersiveAudioButtonProps) => JSX.Element =
    ({ enterImmersiveAudioHandler }: EnterImmersiveAudioButtonProps): JSX.Element =>
        <div {...{ onClick: enterImmersiveAudioHandler, id: 'enable-immersive-audio' }}>enable immersive audio</div>

export default connect(mapStateToProps)(EnterImmersiveAudioButton)
