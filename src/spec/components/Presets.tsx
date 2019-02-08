import { Preset } from '@musical-patterns/pattern'
import {
    ARBITRARILY_LARGE_NUMBER,
    camelCaseToLowerCase,
    deepEqual,
    entries,
    from,
    map,
    negative,
    Ordinal,
    sum,
    translateFromZeroIndexedToOneIndexed,
} from '@musical-patterns/utilities'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { ImmutableRootState, RootStateKeys } from '../../root'
import { EventHandler } from '../../types'
import { buildPresetChangeHandler } from '../events'
import { SpecStateKeys } from '../state'
import { PresetsProps, PresetsPropsFromDispatch, PresetsPropsFromState } from './types'

const mapStateToProps: (state: ImmutableRootState) => PresetsPropsFromState =
    (state: ImmutableRootState): PresetsPropsFromState => ({
        presets: state.get(RootStateKeys.SPEC)
            .get(SpecStateKeys.PRESETS),
        submittedSpec: state.get(RootStateKeys.SPEC)
            .get(SpecStateKeys.SUBMITTED_SPEC),
    })

const mapDispatchToProps: (dispatch: Dispatch) => PresetsPropsFromDispatch =
    (dispatch: Dispatch): PresetsPropsFromDispatch => ({
        presetChangeHandler: buildPresetChangeHandler({ dispatch }),
    })

const Presets: (props: PresetsProps) => JSX.Element =
    ({ presetChangeHandler, presets, submittedSpec }: PresetsProps): JSX.Element => {
        if (!presets) {
            return <div/>
        }

        let selectValue: string = ''
        const options: JSX.Element[] = map(
            entries<string, Preset>(presets)
                .sort(([ _, preset ]: [ string, Preset ], [ __, nextPreset ]: [ string, Preset ]): number => {
                    const order: number = preset.order === undefined ? ARBITRARILY_LARGE_NUMBER : preset.order
                    const nextOrder: number = nextPreset.order === undefined ?
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
            presetChangeHandler({ presets, event })
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

export default connect(mapStateToProps, mapDispatchToProps)(Presets)
