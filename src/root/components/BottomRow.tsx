import * as React from 'react'

const BottomRow: React.ComponentType =
    (): JSX.Element => (
        <div {...{ className: 'row', id: 'bottom-row' }} >
            <div {...{ className: 'left' }} />
            <div {...{ className: 'right' }} />
        </div>
    )

export default BottomRow
