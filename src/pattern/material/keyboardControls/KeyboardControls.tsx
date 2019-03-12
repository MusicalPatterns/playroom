// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect no-null-keyword

import { doAsync, isUndefined } from '@musical-patterns/utilities'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { ImmutableState, KeyboardEventHandler, StateKey } from '../../../types'
import { PatternStateKey } from '../../types'
import { ImmutableMaterialState, MaterialStateKey } from '../types'
import { computeHandleKeyDownEvent, computeUpdateOnKeyDown } from './events'
import { KeyboardControlsProps, KeyboardControlsPropsFromDispatch, KeyboardControlsPropsFromState } from './types'

const mapStateToProps: (state: ImmutableState) => KeyboardControlsPropsFromState =
    (state: ImmutableState): KeyboardControlsPropsFromState => {
        const materialState: ImmutableMaterialState = state.get(StateKey.PATTERN)
            .get(PatternStateKey.MATERIAL)

        return {
            copyOfPausedUsedToPreventUpdatingOnKeyDownUnlessPausedChanges: materialState
                .get(MaterialStateKey.COPY_OF_PAUSED_USED_TO_PREVENT_UPDATING_ON_KEY_DOWN_UNLESS_PAUSED_CHANGES),
            onKeyDown: materialState
                .get(MaterialStateKey.ON_KEY_DOWN),
            paused: materialState
                .get(MaterialStateKey.PAUSED),
        }
    }

const mapDispatchToProps: (dispatch: Dispatch) => KeyboardControlsPropsFromDispatch =
    (dispatch: Dispatch): KeyboardControlsPropsFromDispatch => ({
        handleKeyDownEvent: computeHandleKeyDownEvent({ dispatch }),
        updateOnKeyDown: computeUpdateOnKeyDown({ dispatch }),
    })

const KeyboardControls: React.ComponentType<KeyboardControlsProps> =
    (keyboardControlsProps: KeyboardControlsProps): React.ReactElement | null => {
        const {
            copyOfPausedUsedToPreventUpdatingOnKeyDownUnlessPausedChanges,
            onKeyDown,
            paused,
            handleKeyDownEvent,
            updateOnKeyDown,
        } = keyboardControlsProps

        if (copyOfPausedUsedToPreventUpdatingOnKeyDownUnlessPausedChanges === paused) {
            return null
        }

        if (!isUndefined(onKeyDown)) {
            window.removeEventListener('keydown', onKeyDown)
        }
        const newOnKeyDown: KeyboardEventHandler = async (event: KeyboardEvent): Promise<void> => {
            await handleKeyDownEvent({ event, paused })
        }
        window.addEventListener('keydown', newOnKeyDown)
        doAsync(() => {
            updateOnKeyDown(newOnKeyDown, paused)
        })

        return null
    }

export default connect(mapStateToProps, mapDispatchToProps)(KeyboardControls)
