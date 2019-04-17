// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect no-null-keyword

import { Preset } from '@musical-patterns/spec'
import {
    ARBITRARILY_LARGE_NUMBER,
    camelCaseToUpperCase,
    deepEqual,
    entries,
    from,
    isUndefined,
    map,
    negative,
    Ordinal,
    translateFromZeroIndexedToOneIndexed,
} from '@musical-patterns/utilities'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { EventHandler, ImmutableState, StateKey } from '../../../../types'
import { PatternStateKey } from '../../../types'
import { ImmutableSpecState, SpecStateKey } from '../../types'
import { computeHandlePresetChangeEvent } from './events'
import './styles'
import { PresetSelectProps, PresetSelectPropsFromDispatch, PresetSelectPropsFromState } from './types'

const mapStateToProps: (state: ImmutableState) => PresetSelectPropsFromState =
    (state: ImmutableState): PresetSelectPropsFromState => {
        const specState: ImmutableSpecState = state.get(StateKey.PATTERN)
            .get(PatternStateKey.SPEC)

        return {
            presets: specState.get(SpecStateKey.PRESETS),
            restartOnModify: specState.get(SpecStateKey.RESTART_ON_MODIFY),
            submittedSpecs: specState.get(SpecStateKey.SUBMITTED_SPECS),
        }
    }

const mapDispatchToProps: (dispatch: Dispatch) => PresetSelectPropsFromDispatch =
    (dispatch: Dispatch): PresetSelectPropsFromDispatch => ({
        handlePresetChangeEvent: computeHandlePresetChangeEvent({ dispatch }),
    })

const PresetSelect: React.ComponentType<PresetSelectProps> =
    ({
         handlePresetChangeEvent,
         presets,
         submittedSpecs,
         restartOnModify,
     }: PresetSelectProps): React.ReactElement | null => {
        if (isUndefined(presets)) {
            return null
        }

        let selectValue: string = ''
        const options: Array<React.ReactElement | null> = map(
            entries<string, Preset>(presets)
                .sort(([ _, preset ]: [ string, Preset ], [ __, nextPreset ]: [ string, Preset ]): number => {
                    const order: number = isUndefined(preset.order) ? ARBITRARILY_LARGE_NUMBER : preset.order
                    const nextOrder: number = isUndefined(nextPreset.order) ?
                        ARBITRARILY_LARGE_NUMBER :
                        nextPreset.order

                    return order < nextOrder ? negative(1) : 1
                }),
            (
                [ presetKey, preset ]: [ string, Preset ],
                index: Ordinal<[ string, Preset ]>,
            ): React.ReactElement | null => {
                const { description, formattedName, specs } = preset
                if (deepEqual(specs, submittedSpecs)) {
                    selectValue = presetKey
                }
                const displayName: string = formattedName || camelCaseToUpperCase(presetKey)
                const key: number = from.Ordinal<[ string, Preset ]>(translateFromZeroIndexedToOneIndexed(index))

                return <option {...{ key, value: presetKey, title: description }}>{displayName}</option>
            })
        options.unshift(<option {...{ disabled: true, key: 0 }}/>)

        const onChange: EventHandler = (event: React.SyntheticEvent): void => {
            handlePresetChangeEvent({ presets, event, restartOnModify })
        }

        return (
            <div {...{ id: 'presets' }}>
                <h3>presets</h3>
                <select {...{ onChange, value: selectValue }}>
                    {options}
                </select>
            </div>
        )
    }

export default connect(mapStateToProps, mapDispatchToProps)(PresetSelect)
