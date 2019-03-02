import { setTimePosition } from '@musical-patterns/performer'
import { BEGINNING } from '@musical-patterns/utilities'

const handleRewind: () => Promise<void> =
    async (): Promise<void> => {
        await setTimePosition(BEGINNING)
    }

export {
    handleRewind,
}
