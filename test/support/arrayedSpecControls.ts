import { ARRAYED_PROPERTY_KEY } from './constants'
import { clickElement, elementExists } from './generic'

const clickAdd: () => Promise<void> =
    async (): Promise<void> => {
        await clickElement(`#${ARRAYED_PROPERTY_KEY} .add`)
    }

const clickRemove: () => Promise<void> =
    async (): Promise<void> => {
        await clickElement(`#${ARRAYED_PROPERTY_KEY} .remove`)
    }

const noInvalidMessagesAreShown: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementExists(`#${ARRAYED_PROPERTY_KEY} .invalid-message`))
            .toBeFalsy('at least one invalid message was shown')
    }

export {
    clickAdd,
    clickRemove,
    noInvalidMessagesAreShown,
}
