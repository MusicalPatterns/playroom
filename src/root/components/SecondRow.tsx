import { Pattern } from '@musical-patterns/pattern'
import { Maybe } from '@musical-patterns/utilities'
import * as React from 'react'
import { SpecPanel } from '../../spec'
import PatternListener from './PatternListener'
import { SecondRowProps } from './types'

const SecondRow: (props: SecondRowProps) => JSX.Element =
    ({ id, patterns }: SecondRowProps): JSX.Element => {
        if (!id) {
            return (
                <div {...{ className: 'row', id: 'second-row' }} >
                    <div {...{ className: 'left' }} />
                    <div {...{ className: 'right closed' }} />
                </div>
            )
        }
        const maybePattern: Maybe<Pattern> = patterns[ id ]

        return (
            <div {...{ className: 'row', id: 'second-row' }} >
                <div {...{ className: 'left' }} >
                    <h1>{maybePattern && maybePattern.metadata.formattedName}</h1>
                </div>
                <div {...{ className: 'right' }} >
                    <SpecPanel/>
                    <PatternListener {...{ id, patterns }}/>
                </div>
            </div>
        )
    }

export default SecondRow
