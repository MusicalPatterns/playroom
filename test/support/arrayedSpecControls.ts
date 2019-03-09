import { ARRAYED_PROPERTY_KEY } from './constants'
import { clickElement, elementExists } from './generic'

const clickAddFieldButton: () => Promise<void> =
    async (): Promise<void> => {
        await clickElement(`#${ARRAYED_PROPERTY_KEY} .add-field`)
    }

const clickRemoveFieldButton: () => Promise<void> =
    async (): Promise<void> => {
        await clickElement(`#${ARRAYED_PROPERTY_KEY} .remove-field`)
    }

const noInvalidMessagesAreShown: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementExists(`#${ARRAYED_PROPERTY_KEY} .invalid-message`))
            .toBeFalsy('at least one invalid message was shown')
    }

export {
    clickAddFieldButton,
    clickRemoveFieldButton,
    noInvalidMessagesAreShown,
}
