import { BEGINNING, Duration, Ms, NO_DURATION, Point, round } from '@musical-patterns/utilities'

const formatTimesForDisplay: (parameters: {
    patternDuration: Duration,
    timePosition: Point<Ms>,
}) => {
    patternDurationForDisplay: Duration,
    timePositionForDisplay: Point<Ms>,
} =
    ({ patternDuration, timePosition }: {
        patternDuration: Duration,
        timePosition: Point<Ms>,
    }): {
        patternDurationForDisplay: Duration,
        timePositionForDisplay: Point<Ms>,
    } => ({
        patternDurationForDisplay: round(patternDuration) || NO_DURATION,
        timePositionForDisplay: round(timePosition) || BEGINNING,
    })

export {
    formatTimesForDisplay,
}
