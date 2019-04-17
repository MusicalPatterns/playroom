// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect no-null-keyword

import {
    floor,
    from,
    MILLISECONDS_PER_SECOND,
    modulus,
    quotient,
    round,
    SECONDS_PER_MINUTE,
} from '@musical-patterns/utilities'
import * as React from 'react'
import { connect } from 'react-redux'
import { ImmutableState, StateKey } from '../../../types'
import { PatternStateKey } from '../../types'
import { formatTimesForDisplay } from '../formatTimesForDisplay'
import { ImmutableMaterialState, MaterialStateKey, TimelineOrTimeInMinutesAndSecondsProps } from '../types'
import './styles'

const mapStateToProps: (state: ImmutableState) => TimelineOrTimeInMinutesAndSecondsProps =
    (state: ImmutableState): TimelineOrTimeInMinutesAndSecondsProps => {
        const materialState: ImmutableMaterialState = state.get(StateKey.PATTERN)
            .get(PatternStateKey.MATERIAL)

        return {
            patternDuration: materialState.get(MaterialStateKey.PATTERN_DURATION),
            performerDisabled: materialState.get(MaterialStateKey.PERFORMER_DISABLED),
            timePosition: materialState.get(MaterialStateKey.TIME_POSITION),
        }
    }

const TimeInMinutesAndSeconds: React.ComponentType<TimelineOrTimeInMinutesAndSecondsProps> =
    (
        {
            performerDisabled,
            patternDuration,
            timePosition,
        }: TimelineOrTimeInMinutesAndSecondsProps,
    ): React.ReactElement | null => {
        const { timePositionForDisplay } = formatTimesForDisplay({
            patternDuration,
            timePosition,
        })

        const totalSeconds: number =
            round(quotient(from.Ms(timePositionForDisplay), from.Cardinal(MILLISECONDS_PER_SECOND)))
        const timeMinutesPart: string = floor(quotient(totalSeconds, from.Cardinal(SECONDS_PER_MINUTE)))
            .toString()
        let timeSecondsPart: string = modulus(totalSeconds, from.Cardinal(SECONDS_PER_MINUTE))
            .toString()
        if (timeSecondsPart.length === 1) {
            timeSecondsPart = `0${timeSecondsPart}`
        }

        const disabledClassName: string = performerDisabled ? 'disabled' : ''

        return (
            <div {...{ id: 'time-in-minutes-and-seconds', className: disabledClassName }}>
                <div>{performerDisabled ? '-' : timeMinutesPart}</div>
                <div>:</div>
                <div>{performerDisabled ? '--' : timeSecondsPart}</div>
            </div>
        )
    }

export default connect(mapStateToProps)(TimeInMinutesAndSeconds)
