import * as React from 'react'
import { connect } from 'react-redux'
import { ImmutableRootState, RootStateKey } from '../../root'
import { ImmutablePageState, PageStateKey } from '../state'
import { getPost } from './helpers'
import { PostProps } from './types'

const mapStateToProps: (state: ImmutableRootState) => PostProps =
    (state: ImmutableRootState): PostProps => {
        const patternState: ImmutablePageState = state.get(RootStateKey.PAGE)

        return {
            id: patternState.get(PageStateKey.PATTERN_ID),
            patterns: patternState.get(PageStateKey.PATTERNS),
        }
    }

const Post: React.ComponentType<PostProps> =
    (postProps: PostProps): JSX.Element => (
        <div {...{ dangerouslySetInnerHTML: { __html: getPost(postProps) } }}/>
    )

export default connect(mapStateToProps)(Post)
