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
        handleAddOrRemove: ({ event, specKey, specState }: HandleAddOrRemoveParameters): void => {
            handleArrayedPropertyElementAdd({ dispatch, event, specKey, specState })
        },
    })

const AddButton: (props: AddOrRemoveButtonProps) => JSX.Element =
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

export default connect(undefined, mapDispatchToProps)(AddButton)
