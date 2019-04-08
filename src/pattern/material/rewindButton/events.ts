import { setTimePosition } from '@musical-patterns/material'
import { BEGINNING } from '@musical-patterns/utilities'

const handleRewindClickEvent: () => Promise<void> =
    async (): Promise<void> =>
        setTimePosition(BEGINNING)

export {
    handleRewindClickEvent,
}
