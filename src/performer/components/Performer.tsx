import * as React from 'react'
import EnterImmersiveAudioButton from './EnterImmersiveAudioButton'
import TimeControls from './TimeControls'
import { PerformerProps } from './types'

const Performer: (props: PerformerProps) => JSX.Element =
    ({ disabled }: PerformerProps): JSX.Element => (
        <div>
            <div id='performer'>
                <TimeControls {...{ disabled }}/>
                <EnterImmersiveAudioButton {...{ disabled }}/>
            </div>
            {disabled &&
            <div id='no-pattern-message'>To begin, select a pattern from the list on the left.</div>
            }
        </div>
    )

export default Performer
