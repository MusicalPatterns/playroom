// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect

import { Preset } from '@musical-patterns/pattern'
import {
    ARBITRARILY_LARGE_NUMBER,
    camelCaseToLowerCase,
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
import { EventHandler, ImmutableState, StateKey } from '../../../types'
import { ImmutableSpecState, SpecStateKey } from '../../types'
import { buildHandlePresetChangeEvent } from './events'
import './styles'
import { PresetSelectProps, PresetSelectPropsFromDispatch, PresetSelectPropsFromState } from './types'

const mapStateToProps: (state: ImmutableState) => PresetSelectPropsFromState =
    (state: ImmutableState): PresetSelectPropsFromState => {
        const specState: ImmutableSpecState = state.get(StateKey.SPEC)

        return {
            presets: specState.get(SpecStateKey.PRESETS),
            submittedSpec: specState.get(SpecStateKey.SUBMITTED_SPEC),
        }
    }

const mapDispatchToProps: (dispatch: Dispatch) => PresetSelectPropsFromDispatch =
    (dispatch: Dispatch): PresetSelectPropsFromDispatch => ({
        handlePresetChangeEvent: buildHandlePresetChangeEvent({ dispatch }),
    })

const PresetSelect: React.ComponentType<PresetSelectProps> =
    ({ handlePresetChangeEvent, presets, submittedSpec }: PresetSelectProps): JSX.Element => {
        if (isUndefined(presets)) {
            return <div/>
        }

        let selectValue: string = ''
        const options: JSX.Element[] = map(
            entries<string, Preset>(presets)
                .sort(([ _, preset ]: [ string, Preset ], [ __, nextPreset ]: [ string, Preset ]): number => {
                    const order: number = isUndefined(preset.order) ? ARBITRARILY_LARGE_NUMBER : preset.order
                    const nextOrder: number = isUndefined(nextPreset.order) ?
                        ARBITRARILY_LARGE_NUMBER :
                        nextPreset.order

                    return order < nextOrder ? negative(1) : 1
                }),
            ([ presetKey, preset ]: [ string, Preset ], index: Ordinal): JSX.Element => {
                const { description, formattedName, spec } = preset
                if (deepEqual(spec, submittedSpec)) {
                    selectValue = presetKey
                }
                const displayName: string = formattedName || camelCaseToLowerCase(presetKey)
                const key: number = from.Ordinal(translateFromZeroIndexedToOneIndexed(index))

                return <option {...{ key, value: presetKey, title: description }}>{displayName}</option>
            })
        options.unshift(<option {...{ disabled: true, key: 0 }}/>)

        const onChange: EventHandler = (event: React.SyntheticEvent): void => {
            handlePresetChangeEvent({ presets, event })
        }

        return (
            <div {...{ id: 'presets' }}>
                presets
                <select {...{ onChange, value: selectValue }}>
                    {options}
                </select>
            </div>
        )
    }

export default connect(mapStateToProps, mapDispatchToProps)(PresetSelect)