export {
    performerReducer,
    ImmutablePerformerState,
    PerformerAction,
    PerformerStateKey,
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
