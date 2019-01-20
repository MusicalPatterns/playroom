import { Metadata } from '@musical-patterns/pattern'
import { Pattern } from '@musical-patterns/registry'
import * as React from 'react'
import { PropsFromApp } from './types'

const Post: (postProps: PropsFromApp) => JSX.Element =
    ({ patterns, id }: PropsFromApp): JSX.Element => {
        const pattern: Pattern = patterns[ id ]
        const metadata: Metadata = pattern.metadata

        return (
            <div {...{ dangerouslySetInnerHTML: { __html: metadata.description } }}/>
        )
    }

export default Post
