import * as React from 'react'
import NoPatternMessage from './NoPatternMessage'
import Performer from './Performer'
import { MaybeDisabled } from './types'

const PerformerPanel: (props: MaybeDisabled) => JSX.Element =
    ({ disabled }: MaybeDisabled): JSX.Element => (
        <div {...{ id: 'performer-panel' }}>
            <Performer {...{ disabled }} />
            <NoPatternMessage {...{ disabled }}/>
        </div>
    )

export default PerformerPanel
