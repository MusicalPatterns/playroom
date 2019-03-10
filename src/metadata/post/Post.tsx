// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect no-null-keyword

import * as React from 'react'
import { connect } from 'react-redux'
import { ImmutableState, StateKey } from '../../types'
import { MetadataStateKey } from '../types'
import { PostProps } from './types'

const mapStateToProps: (state: ImmutableState) => PostProps =
    (state: ImmutableState): PostProps => ({
        post: state.get(StateKey.METADATA)
            .get(MetadataStateKey.POST),
    })

const Post: React.ComponentType<PostProps> =
    ({ post }: PostProps): React.ReactElement | null => (
        <div {...{ dangerouslySetInnerHTML: { __html: post || '' } }}/>
    )

export default connect(mapStateToProps)(Post)
