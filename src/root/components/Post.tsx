import { PatternMetadata } from '@musical-patterns/pattern'
import { AnyPattern } from '@musical-patterns/registry'
import * as React from 'react'
import { PropsFromApp } from './types'

const Post: (postProps: PropsFromApp) => JSX.Element =
    ({ patterns, patternId }: PropsFromApp): JSX.Element => {
        const pattern: AnyPattern = patterns[ patternId ]
        const patternMetadata: PatternMetadata = pattern.metadata

        return (
            <div {...{ dangerouslySetInnerHTML: { __html: patternMetadata.description } }}/>
        )
    }

export default Post
