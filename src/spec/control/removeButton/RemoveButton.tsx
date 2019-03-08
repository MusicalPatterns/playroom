// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect

import { faMinus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DomValue } from '@musical-patterns/pattern'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { EventHandler, ImmutableState, StateKey } from '../../../types'
import { ImmutableSpecState, SpecStateKey } from '../../types'
import { isArrayedDisplayedValue } from '../isArrayedDisplayedValue'
import { handleArrayedSpecControlRemove } from './events'
import {
    HandleRemoveEventParameters,
    RemoveButtonProps,
    RemoveButtonPropsFromDispatch,
    RemoveButtonPropsFromState,
} from './types'

const mapStateToProps: (state: ImmutableState) => RemoveButtonPropsFromState =
    (state: ImmutableState): RemoveButtonPropsFromState => {
        const specState: ImmutableSpecState = state.get(StateKey.SPEC)

        return {
            attributes: specState.get(SpecStateKey.ATTRIBUTES),
            displayedSpec: specState.get(SpecStateKey.DISPLAYED_SPEC),
            submittedSpec: specState.get(SpecStateKey.SUBMITTED_SPEC),
            validationFunction: specState.get(SpecStateKey.VALIDATION_FUNCTION),
            validationResults: specState.get(SpecStateKey.VALIDATION_RESULTS),
        }
    }

const mapDispatchToProps: (dispatch: Dispatch) => RemoveButtonPropsFromDispatch =
    (dispatch: Dispatch): RemoveButtonPropsFromDispatch => ({
        handleRemoveEvent: (handleAddOrRemoveParameters: HandleRemoveEventParameters): void => {
            handleArrayedSpecControlRemove({ dispatch, ...handleAddOrRemoveParameters })
        },
    })

const RemoveButton: React.ComponentType<RemoveButtonProps> =
    (props: RemoveButtonProps): JSX.Element => {
        const {
            handleRemoveEvent,
            property,
            attributes,
            displayedSpec,
            submittedSpec,
            validationFunction,
            validationResults,
        } = props
        const onClick: EventHandler = (event: React.SyntheticEvent): void => {
            handleRemoveEvent({
                attributes,
                displayedSpec,
                event,
                property,
                submittedSpec,
                validationFunction,
                validationResults,
            })
        }

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
