interface KeyboardControlsPropsFromState {
    paused: boolean,
}

interface KeyboardControlsPropsFromDispatch {
    handleKeyDownEvent: HandleKeyDownEvent,
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

export {
    KeyboardControlsPropsFromState,
    KeyboardControlsPropsFromDispatch,
    KeyboardControlsProps,
    HandleKeyDownEventParameters,
    HandleKeyDownEvent,
    KeyCode,
}
