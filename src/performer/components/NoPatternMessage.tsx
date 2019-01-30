import * as React from 'react'
import { TO_BEGIN_MESSAGE } from '../../copy'
import { MaybeDisabled } from './types'

const NoPatternMessage: (props: MaybeDisabled) => JSX.Element =
    ({ disabled }: MaybeDisabled): JSX.Element => {
        if (disabled) {
            return <div/>
        }

        return (
            <div {...{ id: 'no-pattern-message' }}>
                {TO_BEGIN_MESSAGE}
            </div>
        )
    }

export default NoPatternMessage
