// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect no-null-keyword

import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { ImmutableState, KeyboardEventHandler, StateKey } from '../../types'
import { MaterialStateKey } from '../types'
import { computeHandleKeyDownEvent } from './events'
import { KeyboardControlsProps, KeyboardControlsPropsFromDispatch, KeyboardControlsPropsFromState } from './types'

const mapStateToProps: (state: ImmutableState) => KeyboardControlsPropsFromState =
    (state: ImmutableState): KeyboardControlsPropsFromState => ({
        paused: state.get(StateKey.MATERIAL)
            .get(MaterialStateKey.PAUSED),
    })

const mapDispatchToProps: (dispatch: Dispatch) => KeyboardControlsPropsFromDispatch =
    (dispatch: Dispatch): KeyboardControlsPropsFromDispatch => ({
        handleKeyDownEvent: computeHandleKeyDownEvent({ dispatch }),
    })

let oldOnKeyDown: KeyboardEventHandler

const KeyboardControls: React.ComponentType<KeyboardControlsProps> =
    ({ paused, handleKeyDownEvent }: KeyboardControlsProps): React.ReactElement | null => {
        const onKeyDown: KeyboardEventHandler = async (event: KeyboardEvent): Promise<void> => {
            await handleKeyDownEvent({ event, paused })
        }
        window.removeEventListener('keydown', oldOnKeyDown)
        window.addEventListener('keydown', onKeyDown)
        oldOnKeyDown = onKeyDown

        return null
    }

export default connect(mapStateToProps, mapDispatchToProps)(KeyboardControls)
