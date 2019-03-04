import * as React from 'react'
import { connect } from 'react-redux'
import { ImmutableLeftColumnState, LeftColumnStateKey } from '../../leftColumn'
import { ImmutableRootState, RootStateKey } from '../state'
import { getPost } from './helpers'
import { PostProps } from './types'

const mapStateToProps: (state: ImmutableRootState) => PostProps =
    (state: ImmutableRootState): PostProps => {
        const leftColumnState: ImmutableLeftColumnState = state.get(RootStateKey.LEFT_COLUMN)

        return {
            id: leftColumnState.get(LeftColumnStateKey.PATTERN_ID),
            patterns: leftColumnState.get(LeftColumnStateKey.PATTERNS),
        }
    }

const Post: React.ComponentType<PostProps> =
    (postProps: PostProps): JSX.Element => (
        <div {...{ dangerouslySetInnerHTML: { __html: getPost(postProps) } }}/>
    )

export default connect(mapStateToProps)(Post)
