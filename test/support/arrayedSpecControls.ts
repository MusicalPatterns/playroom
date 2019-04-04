import { ARRAYED_SPEC_KEY, ARRAYED_SPEC_WITH_INITIAL_FIELD_VALUE_KEY } from './constants'
import { clickElement, elementExists } from './generic'

const clickAddFieldButton: () => Promise<void> =
    async (): Promise<void> => {
        await clickElement(`#${ARRAYED_SPEC_KEY} .add-field`)
    }

const clickRemoveFieldButton: () => Promise<void> =
    async (): Promise<void> => {
        await clickElement(`#${ARRAYED_SPEC_KEY} .remove-field`)
    }

const clickRemoveFieldButtonForOtherArrayedSpecControl: () => Promise<void> =
    async (): Promise<void> => {
        await clickElement(`#${ARRAYED_SPEC_WITH_INITIAL_FIELD_VALUE_KEY} .remove-field`)
    }

const noInvalidMessagesAreShown: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementExists(`#${ARRAYED_SPEC_KEY} .invalid-message`))
            .toBeFalsy('at least one invalid message was shown')
    }

export {
    clickAddFieldButton,
    clickRemoveFieldButton,
    clickRemoveFieldButtonForOtherArrayedSpecControl,
    noInvalidMessagesAreShown,
}
