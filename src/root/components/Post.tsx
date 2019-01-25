import { Metadata, Pattern } from '@musical-patterns/pattern'
import { Maybe } from '@musical-patterns/utilities'
import * as React from 'react'
import { PropsFromApp } from './types'

const Post: (postProps: PropsFromApp) => JSX.Element =
    ({ patterns, id }: PropsFromApp): JSX.Element => {
        const pattern: Maybe<Pattern> = patterns[ id ]
        const metadata: Maybe<Metadata> = pattern && pattern.metadata

        return (
            <div {...{ dangerouslySetInnerHTML: { __html: metadata && metadata.description || '' } }}/>
        )
    }

export default Post
