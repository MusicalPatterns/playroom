// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect

import { faMinus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DomSpec, DomValue } from '@musical-patterns/pattern'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { EventHandler, ImmutableState, StateKey } from '../../../types'
import { SpecStateKey } from '../../types'
import { isArrayedDisplayedValue } from '../isArrayedDisplayedValue'
import {
    AddOrRemoveButtonProps,
    AddOrRemoveButtonPropsFromDispatch,
    AddOrRemoveButtonPropsFromState,
    HandleAddOrRemoveParameters,
} from '../types'
import { handleArrayedSpecControlRemove } from './events'

const mapStateToProps: (state: ImmutableState) => AddOrRemoveButtonPropsFromState =
    (state: ImmutableState): AddOrRemoveButtonPropsFromState => ({
        specState: state.get(StateKey.SPEC),
    })

const mapDispatchToProps: (dispatch: Dispatch) => AddOrRemoveButtonPropsFromDispatch =
    (dispatch: Dispatch): AddOrRemoveButtonPropsFromDispatch => ({
        handleAddOrRemove: ({ event, property, specState }: HandleAddOrRemoveParameters): void => {
            handleArrayedSpecControlRemove({ dispatch, event, property, specState })
        },
    })

const RemoveButton: React.ComponentType<AddOrRemoveButtonProps> =
    ({ handleAddOrRemove, property, specState }: AddOrRemoveButtonProps): JSX.Element => {
        const onClick: EventHandler = (event: React.SyntheticEvent): void => {
            handleAddOrRemove({ event, property, specState })
        }

        const displayedSpec: DomSpec = specState.get(SpecStateKey.DISPLAYED_SPEC)
        const displayedValue: DomValue = displayedSpec[ property ]
        if (!isArrayedDisplayedValue(displayedValue)) {
            throw new Error('cannot treat a singular spec control as arrayed')
        }
        const disabled: boolean = !displayedValue.length

        return (
            <button {...{ className: 'remove', onClick, disabled }}>
                <FontAwesomeIcon {...{ icon: faMinus }}/>
            </button>
        )
    }

export default connect(mapStateToProps, mapDispatchToProps)(RemoveButton)
