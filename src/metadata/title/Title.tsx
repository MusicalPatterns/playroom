// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect

import * as React from 'react'
import { connect } from 'react-redux'
import { PageStateKey } from '../../page'
import { ImmutableState, StateKey } from '../../types'
import { MetadataStateKey } from '../types'
import { TitleProps } from './types'

const mapStateToProps: (state: ImmutableState) => TitleProps =
    (state: ImmutableState): TitleProps => ({
        pageName: state.get(StateKey.PAGE)
            .get(PageStateKey.PAGE_NAME),
        patternName: state.get(StateKey.METADATA)
            .get(MetadataStateKey.PATTERN_NAME),
    })

const Title: React.ComponentType<TitleProps> =
    ({ pageName, patternName }: TitleProps): JSX.Element =>
        <h1>{pageName || patternName}</h1>

export default connect(mapStateToProps)(Title)
