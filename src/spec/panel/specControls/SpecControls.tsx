// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect

import { StandardProperties } from '@musical-patterns/pattern'
import { from, keys, map, Ordinal } from '@musical-patterns/utilities'
import * as React from 'react'
import { connect } from 'react-redux'
import { PATTERN_PARTICULAR, STANDARD } from '../../../copy'
import { ImmutableState, StateKey } from '../../../types'
import { SpecControl } from '../../control'
import { SpecStateKey } from '../../types'
import { buildSortSpecControls } from './sortSpecControls'
import './styles'
import { SpecControlsProps } from './types'

const mapStateToProps: (state: ImmutableState) => SpecControlsProps =
    (state: ImmutableState): SpecControlsProps => ({
        attributes: state.get(StateKey.SPEC)
            .get(SpecStateKey.ATTRIBUTES),
        displayedSpec: state.get(StateKey.SPEC)
            .get(SpecStateKey.DISPLAYED_SPEC),
    })

const SpecControls: React.ComponentType<SpecControlsProps> =
    ({ displayedSpec, attributes }: SpecControlsProps): JSX.Element => {
        const standardSpecControls: JSX.Element[] = map(
            keys(displayedSpec)
                .filter((property: string) =>
                    Object.values(StandardProperties)
                        .includes(property),
                )
                .sort(buildSortSpecControls(attributes)),
            (property: string, index: Ordinal): JSX.Element =>
                <SpecControl {...{ key: from.Ordinal(index), property }} />,
        )
        const patternParticularControls: JSX.Element[] = map(
            keys(displayedSpec)
                .filter((property: string) =>
                    !Object.values(StandardProperties)
                        .includes(property),
                )
                .sort(buildSortSpecControls(attributes)),
            (property: string, index: Ordinal): JSX.Element =>
                <SpecControl {...{ key: from.Ordinal(index), property }} />,
        )

        const bothPatternParticularAndStandardControlsArePresent: boolean = !!standardSpecControls.length &&
            !!patternParticularControls.length

        return (
            <div {...{ id: 'spec-controls' }}>
                {bothPatternParticularAndStandardControlsArePresent && <h3>{PATTERN_PARTICULAR}</h3>}
                {patternParticularControls}
                {bothPatternParticularAndStandardControlsArePresent && <h3>{STANDARD}</h3>}
                {standardSpecControls}
            </div>
        )
    }

export default connect(mapStateToProps)(SpecControls)
