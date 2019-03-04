import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { EventHandler } from '../../../types'
import { handleArrayedPropertyElementAdd } from '../../events'
import { AddOrRemoveButtonProps, AddOrRemoveButtonPropsFromDispatch, HandleAddOrRemoveParameters } from './types'

const mapDispatchToProps: (dispatch: Dispatch) => AddOrRemoveButtonPropsFromDispatch =
    (dispatch: Dispatch): AddOrRemoveButtonPropsFromDispatch => ({
        handleAddOrRemove: ({ event, specKey, rightColumnState }: HandleAddOrRemoveParameters): void => {
            handleArrayedPropertyElementAdd({ dispatch, event, specKey, rightColumnState })
        },
    })

const AddButton: React.ComponentType<AddOrRemoveButtonProps> =
    ({ handleAddOrRemove, specKey, rightColumnState }: AddOrRemoveButtonProps): JSX.Element => {
        const onClick: EventHandler = (event: React.SyntheticEvent): void => {
            handleAddOrRemove({ event, specKey, rightColumnState })
        }

        return (
            <button {...{ className: 'add', onClick }}>
                <FontAwesomeIcon {...{ icon: faPlus }}/>
            </button>
        )
    }

export default connect(undefined, mapDispatchToProps)(AddButton)
