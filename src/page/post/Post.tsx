// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect

import * as React from 'react'
import { connect } from 'react-redux'
import { ImmutableState, StateKey } from '../../types'
import { ImmutablePageState, PageStateKey } from '../types'
import { getPost } from './getPost'
import { PostProps } from './types'

const mapStateToProps: (state: ImmutableState) => PostProps =
    (state: ImmutableState): PostProps => {
        const patternState: ImmutablePageState = state.get(StateKey.PAGE)

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
