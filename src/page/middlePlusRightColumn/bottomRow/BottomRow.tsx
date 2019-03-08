// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect

import * as React from 'react'
import './styles'

const BottomRow: React.ComponentType =
    (): JSX.Element => (
        <div {...{ className: 'row', id: 'bottom-row' }} >
            <div {...{ className: 'middle' }} />
            <div {...{ className: 'right' }} />
        </div>
    )

export default BottomRow
