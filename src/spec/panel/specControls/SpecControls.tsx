// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect no-null-keyword

import { StandardProperty } from '@musical-patterns/pattern'
import { from, keys, map, Ordinal } from '@musical-patterns/utilities'
import * as React from 'react'
import { connect } from 'react-redux'
import { PATTERN_PARTICULAR, STANDARD } from '../../../copy'
import { ImmutableState, StateKey } from '../../../types'
import { SpecControl } from '../../control'
import { ImmutableSpecState, SpecStateKey } from '../../types'
import { buildSortSpecControls } from './sortSpecControls'
import './styles'
import { SpecControlsProps } from './types'

const mapStateToProps: (state: ImmutableState) => SpecControlsProps =
    (state: ImmutableState): SpecControlsProps => {
        const specState: ImmutableSpecState = state.get(StateKey.SPEC)

        return {
            attributes: specState.get(SpecStateKey.ATTRIBUTES),
            displayedSpec: specState.get(SpecStateKey.DISPLAYED_SPEC),
        }
    }

const SpecControls: React.ComponentType<SpecControlsProps> =
    ({ displayedSpec, attributes }: SpecControlsProps): React.ReactElement | null => {
        const standardSpecControls: Array<React.ReactElement | null> = map(
            keys(displayedSpec)
                .filter((property: string) =>
                    Object.values(StandardProperty)
                        .includes(property),
                )
                .sort(buildSortSpecControls(attributes)),
            (property: string, index: Ordinal): React.ReactElement | null =>
                <SpecControl {...{ key: from.Ordinal(index), property }} />,
        )
        const patternParticularControls: Array<React.ReactElement | null> = map(
            keys(displayedSpec)
                .filter((property: string) =>
                    !Object.values(StandardProperty)
                        .includes(property),
                )
                .sort(buildSortSpecControls(attributes)),
            (property: string, index: Ordinal): React.ReactElement | null =>
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
