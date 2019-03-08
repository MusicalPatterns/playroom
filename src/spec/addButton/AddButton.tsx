// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect

import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { EventHandler, ImmutableState, StateKey } from '../../types'
import {
    AddOrRemoveButtonProps,
    AddOrRemoveButtonPropsFromDispatch,
    AddOrRemoveButtonPropsFromState,
    HandleAddOrRemoveParameters,
} from '../types'
import { handleArrayedPropertyElementAdd } from './events'

const mapStateToProps: (state: ImmutableState) => AddOrRemoveButtonPropsFromState =
    (state: ImmutableState): AddOrRemoveButtonPropsFromState => ({
        specState: state.get(StateKey.SPEC),
    })

const mapDispatchToProps: (dispatch: Dispatch) => AddOrRemoveButtonPropsFromDispatch =
    (dispatch: Dispatch): AddOrRemoveButtonPropsFromDispatch => ({
        handleAddOrRemove: ({ event, specKey, specState }: HandleAddOrRemoveParameters): void => {
            handleArrayedPropertyElementAdd({ dispatch, event, specKey, specState })
        },
    })

const AddButton: React.ComponentType<AddOrRemoveButtonProps> =
    ({ handleAddOrRemove, specKey, specState }: AddOrRemoveButtonProps): JSX.Element => {
        const onClick: EventHandler = (event: React.SyntheticEvent): void => {
            handleAddOrRemove({ event, specKey, specState })
        }

        return (
            <button {...{ className: 'add', onClick }}>
                <FontAwesomeIcon {...{ icon: faPlus }}/>
            </button>
        )
    }

export default connect(mapStateToProps, mapDispatchToProps)(AddButton)
