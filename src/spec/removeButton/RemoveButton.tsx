// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect

import { faMinus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DomSpec, DomSpecValue } from '@musical-patterns/pattern'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { EventHandler, ImmutableState, StateKey } from '../../types'
import { isArrayedDomSpecValue } from '../isArrayedDomSpecValue'
import {
    AddOrRemoveButtonProps,
    AddOrRemoveButtonPropsFromDispatch, AddOrRemoveButtonPropsFromState,
    HandleAddOrRemoveParameters,
    SpecStateKey,
} from '../types'
import { handleArrayedPropertyElementRemove } from './events'

const mapStateToProps: (state: ImmutableState) => AddOrRemoveButtonPropsFromState =
    (state: ImmutableState): AddOrRemoveButtonPropsFromState => ({
        specState: state.get(StateKey.SPEC),
    })

const mapDispatchToProps: (dispatch: Dispatch) => AddOrRemoveButtonPropsFromDispatch =
    (dispatch: Dispatch): AddOrRemoveButtonPropsFromDispatch => ({
        handleAddOrRemove: ({ event, specKey, specState }: HandleAddOrRemoveParameters): void => {
            handleArrayedPropertyElementRemove({ dispatch, event, specKey, specState })
        },
    })

const RemoveButton: React.ComponentType<AddOrRemoveButtonProps> =
    ({ handleAddOrRemove, specKey, specState }: AddOrRemoveButtonProps): JSX.Element => {
        const onClick: EventHandler = (event: React.SyntheticEvent): void => {
            handleAddOrRemove({ event, specKey, specState })
        }

        const displayedSpec: DomSpec = specState.get(SpecStateKey.DISPLAYED_SPEC)
        const domSpecValue: DomSpecValue = displayedSpec[ specKey ]
        if (!isArrayedDomSpecValue(domSpecValue)) {
            throw new Error('tried to remove an element from a non-arrayed dom spec value')
        }
        const disabled: boolean = !domSpecValue.length

        return (
            <button {...{ className: 'remove', onClick, disabled }}>
                <FontAwesomeIcon {...{ icon: faMinus }}/>
            </button>
        )
    }

export default connect(mapStateToProps, mapDispatchToProps)(RemoveButton)
