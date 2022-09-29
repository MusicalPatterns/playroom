// tslint:disable

import * as React from 'react'
import { connect } from 'react-redux'
import { ImmutableState, StateKey } from '../../../types'
import { PageName, PageStateKey } from '../../types'
import { PageProps } from './types'
// @ts-ignore
import aboutPage from './about.html'

const mapStateToProps: (state: ImmutableState) => PageProps =
    (state: ImmutableState): PageProps => ({
        pageName: state.get(StateKey.PAGE)
            .get(PageStateKey.PAGE_NAME),
    })

const Page: React.ComponentType<PageProps> =
    ({ pageName }: PageProps): React.ReactElement | null => {
        switch (pageName) {
            case PageName.ABOUT:
                return (
                    <div {...{ dangerouslySetInnerHTML: { __html: aboutPage } }} />
                )
            default:
                return null
        }
    }

export default connect(mapStateToProps)(Page)
