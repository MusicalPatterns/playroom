import * as React from 'react'
import { connect } from 'react-redux'
import { ImmutablePatternState, PatternStateKey } from '../../pattern'
import { ImmutableRootState, RootStateKey } from '../state'
import { getPost } from './helpers'
import { PostProps } from './types'

const mapStateToProps: (state: ImmutableRootState) => PostProps =
    (state: ImmutableRootState): PostProps => {
        const patternState: ImmutablePatternState = state.get(RootStateKey.PATTERN)

        return {
            id: patternState.get(PatternStateKey.ID),
            patterns: patternState.get(PatternStateKey.PATTERNS),
        }
    }

const Post: React.ComponentType<PostProps> =
    (postProps: PostProps): JSX.Element => (
        <div {...{ dangerouslySetInnerHTML: { __html: getPost(postProps) } }}/>
    )

export default connect(mapStateToProps)(Post)
