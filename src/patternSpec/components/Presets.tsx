import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { EventHandler } from '../../types'
import { buildPresetSubmitHandler } from '../events'
import { PresetsProps, PresetsPropsFromDispatch } from './types'

const mapDispatchToProps: (dispatch: Dispatch) => PresetsPropsFromDispatch =
    (dispatch: Dispatch): PresetsPropsFromDispatch => ({
        presetSubmitHandler: buildPresetSubmitHandler(dispatch),
    })

const Presets: (props: PresetsProps) => JSX.Element =
    ({ presetSubmitHandler, presets }: PresetsProps): JSX.Element => {
        const options: JSX.Element[] = Object.keys(presets)
            .map((presetKey: string, key: number): JSX.Element =>
                <option {...{ key, value: presetKey }}>{presetKey}</option>)

        const onChange: EventHandler = (event: React.SyntheticEvent): void => {
            presetSubmitHandler({ presets, event })
        }

        return (
            <select {...{ id: 'presets', onChange }}>
                {options}
            </select>
        )
    }

export default connect(undefined, mapDispatchToProps)(Presets)
