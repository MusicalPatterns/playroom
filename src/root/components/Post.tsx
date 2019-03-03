import * as React from 'react'
import { connect } from 'react-redux'
import { ImmutablePatternState, PatternStateKeys } from '../../pattern'
import { ImmutableRootState, RootStateKeys } from '../state'
import { getPost } from './helpers'
import { PostProps } from './types'

const mapStateToProps: (state: ImmutableRootState) => PostProps =
    (state: ImmutableRootState): PostProps => {
        const patternState: ImmutablePatternState = state.get(RootStateKeys.PATTERN)

        return {
            id: patternState.get(PatternStateKeys.ID),
            patterns: patternState.get(PatternStateKeys.PATTERNS),
        }
    }

const Post: React.ComponentType<PostProps> =
    (postProps: PostProps): JSX.Element => (
        <div {...{ dangerouslySetInnerHTML: { __html: getPost(postProps) } }}/>
    )

export default connect(mapStateToProps)(Post)
