import { Dispatch } from 'redux'

enum SecretSelectorsForTest {
    SECRET_SUBMITTED_PATTERN_SPEC_INPUT = 'secret-submitted-pattern-spec-input',
    SECRET_TIMER = 'secret-timer',
    SECRET_TOTAL_DURATION = 'secret-total-duration',
}

interface DispatchAsProp {
    dispatch: Dispatch,
}

export {
    DispatchAsProp,
    SecretSelectorsForTest,
}
