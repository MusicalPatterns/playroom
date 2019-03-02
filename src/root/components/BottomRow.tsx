import * as React from 'react'

const BottomRow: () => JSX.Element =
    (): JSX.Element => (
        <div {...{ className: 'row', id: 'bottom-row' }} >
            <div {...{ className: 'left' }} />
            <div {...{ className: 'right' }} />
        </div>
    )

export default BottomRow
