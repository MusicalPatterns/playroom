// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect no-null-keyword

import { StandardSpec } from '@musical-patterns/pattern'
import { from, isEmpty, keys, map, Ordinal } from '@musical-patterns/utilities'
import * as React from 'react'
import { connect } from 'react-redux'
import { PATTERN_PARTICULAR, STANDARD } from '../../../../copy'
import { ImmutableState, StateKey } from '../../../../types'
import { PatternStateKey } from '../../../types'
import { SpecControl } from '../../control'
import { ImmutableSpecState, SpecStateKey } from '../../types'
import { computeSortSpecControls } from './sortSpecControls'
import './styles.scss'
import { SpecControlsProps } from './types'

const mapStateToProps: (state: ImmutableState) => SpecControlsProps =
    (state: ImmutableState): SpecControlsProps => {
        const specState: ImmutableSpecState = state.get(StateKey.PATTERN)
            .get(PatternStateKey.SPEC)

        return {
            configurations: specState.get(SpecStateKey.CONFIGURATIONS),
            displayedSpecs: specState.get(SpecStateKey.DISPLAYED_SPECS),
        }
    }

const SpecControls: React.ComponentType<SpecControlsProps> =
    ({ displayedSpecs, configurations }: SpecControlsProps): React.ReactElement | null => {
        const standardSpecControls: Array<React.ReactElement | null> = map(
            keys(displayedSpecs)
                .filter((specKey: string) =>
                    Object.values(StandardSpec)
                        .includes(specKey),
                )
                .sort(computeSortSpecControls(configurations)),
            (specKey: string, index: Ordinal): React.ReactElement | null =>
                <SpecControl {...{ key: from.Ordinal(index), specKey }} />,
        )
        const patternParticularControls: Array<React.ReactElement | null> = map(
            keys(displayedSpecs)
                .filter((specKey: string) =>
                    !Object.values(StandardSpec)
                        .includes(specKey),
                )
                .sort(computeSortSpecControls(configurations)),
            (specKey: string, index: Ordinal): React.ReactElement | null =>
                <SpecControl {...{ key: from.Ordinal(index), specKey }} />,
        )

        const bothPatternParticularAndStandardControlsArePresent: boolean = !isEmpty(standardSpecControls) &&
            !isEmpty(patternParticularControls)

        return (
            <div {...{ id: 'spec-controls' }}>
                {bothPatternParticularAndStandardControlsArePresent ? <h3>{PATTERN_PARTICULAR}</h3> : <h3/>}
                {patternParticularControls}
                {bothPatternParticularAndStandardControlsArePresent && <hr/>}
                {bothPatternParticularAndStandardControlsArePresent ? <h3>{STANDARD}</h3> : <h3/>}
                {standardSpecControls}
            </div>
        )
    }

export default connect(mapStateToProps)(SpecControls)
