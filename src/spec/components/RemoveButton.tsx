import { faMinus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { DomValueOrChecked, EventHandler } from '../../types'
import { handleArrayedPropertyElementRemove } from '../events'
import { AddOrRemoveButtonProps, AddOrRemoveButtonPropsFromDispatch, HandleAddOrRemoveParameters } from './types'

const mapDispatchToProps: (dispatch: Dispatch) => AddOrRemoveButtonPropsFromDispatch =
    (dispatch: Dispatch): AddOrRemoveButtonPropsFromDispatch => ({
        handleAddOrRemove: ({ event, specKey, displayedSpec }: HandleAddOrRemoveParameters): void => {
            handleArrayedPropertyElementRemove({ dispatch, event, specKey, displayedSpec })
        },
    })

const RemoveButton: (props: AddOrRemoveButtonProps) => JSX.Element =
    ({ handleAddOrRemove, specKey, displayedSpec }: AddOrRemoveButtonProps): JSX.Element => {
        const onClick: EventHandler = (event: React.SyntheticEvent): void => {
            handleAddOrRemove({ event, specKey, displayedSpec })
        }

        const arrayedSpecValue: DomValueOrChecked[] = displayedSpec[ specKey ] as DomValueOrChecked[]
        const disabled: boolean = !arrayedSpecValue.length

        return (
            <button {...{ className: 'remove', onClick, disabled }}>
                <FontAwesomeIcon {...{ icon: faMinus }}/>
            </button>
        )
    }

export default connect(undefined, mapDispatchToProps)(RemoveButton)
