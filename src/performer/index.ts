export {
    PerformerStateActionType,
    performerReducer,
    ImmutablePerformerState,
    PerformerStateAction,
} from './state'
export {
    PerformerPanel,
} from './components'
export {
    onPerformerUpdate,
    buildToggleImmersiveAudioHandlers,
    setupKeyboard,
} from './setup'
export {
    stopActions,
} from './events'

// tslint:disable-next-line no-import-side-effect
import './styles'
