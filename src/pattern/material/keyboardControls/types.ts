import { Maybe } from '@musical-patterns/utilities'
import { KeyboardEventHandler } from '../../../types'

interface KeyboardControlsPropsFromState {
    copyOfPausedUsedToPreventUpdatingOnKeyDownUnlessPausedChanges: boolean,
    onKeyDown: Maybe<KeyboardEventHandler>,
    paused: boolean,
}

interface KeyboardControlsPropsFromDispatch {
    handleKeyDownEvent: HandleKeyDownEvent,
    updateOnKeyDown: UpdateOnKeyDown,
}

interface KeyboardControlsProps extends KeyboardControlsPropsFromState, KeyboardControlsPropsFromDispatch {}

interface HandleKeyDownEventParameters {
    event: KeyboardEvent,
    paused: boolean,
}

type HandleKeyDownEvent = (handleKeyDownEventParameters: HandleKeyDownEventParameters) => Promise<void>

enum KeyCode {
    SPACE = 32,
    ESCAPE = 27,
    HOME = 36,
}

type UpdateOnKeyDown = (newOnKeyDown: KeyboardEventHandler, paused: boolean) => void

export {
    KeyboardControlsPropsFromState,
    KeyboardControlsPropsFromDispatch,
    KeyboardControlsProps,
    HandleKeyDownEventParameters,
    HandleKeyDownEvent,
    KeyCode,
    UpdateOnKeyDown,
}
