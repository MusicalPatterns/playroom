import * as React from 'react'

const Title: () => JSX.Element =
    (): JSX.Element => (
        <div {...{ id: 'title' }}>
            <div {...{ id: 'title-contents' }}>
                <h1>Musical Patterns</h1>
                <div><a {...{ href: 'https://douglasblumeyer.com', target: '__blank' }}>Douglas Blumeyer</a></div>
            </div>
        </div>
    )

export default Title
