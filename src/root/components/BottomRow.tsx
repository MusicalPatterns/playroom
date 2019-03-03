import * as React from 'react'

const BottomRow: React.ComponentType =
    (): JSX.Element => (
        <div {...{ className: 'row', id: 'bottom-row' }} >
            <div {...{ className: 'middle' }} />
            <div {...{ className: 'right' }} />
        </div>
    )

export default BottomRow
