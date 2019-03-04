import { faMinus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Spec } from '@musical-patterns/pattern'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { DomValueOrChecked, EventHandler } from '../../../types'
import { handleArrayedPropertyElementRemove } from '../../events'
import { RightColumnStateKey } from '../../state'
import { AddOrRemoveButtonProps, AddOrRemoveButtonPropsFromDispatch, HandleAddOrRemoveParameters } from './types'

const mapDispatchToProps: (dispatch: Dispatch) => AddOrRemoveButtonPropsFromDispatch =
    (dispatch: Dispatch): AddOrRemoveButtonPropsFromDispatch => ({
        handleAddOrRemove: ({ event, specKey, rightColumnState }: HandleAddOrRemoveParameters): void => {
            handleArrayedPropertyElementRemove({ dispatch, event, specKey, rightColumnState })
        },
    })

const RemoveButton: React.ComponentType<AddOrRemoveButtonProps> =
    ({ handleAddOrRemove, specKey, rightColumnState }: AddOrRemoveButtonProps): JSX.Element => {
        const onClick: EventHandler = (event: React.SyntheticEvent): void => {
            handleAddOrRemove({ event, specKey, rightColumnState })
        }

        const displayedSpec: Spec = rightColumnState.get(RightColumnStateKey.DISPLAYED_SPEC)
        const arrayedSpecValue: DomValueOrChecked[] = displayedSpec[ specKey ] as DomValueOrChecked[]
        const disabled: boolean = !arrayedSpecValue.length

        return (
            <button {...{ className: 'remove', onClick, disabled }}>
                <FontAwesomeIcon {...{ icon: faMinus }}/>
            </button>
        )
    }

export default connect(undefined, mapDispatchToProps)(RemoveButton)
