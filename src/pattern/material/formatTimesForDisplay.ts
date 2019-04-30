import { BEGINNING, Duration, Ms, NO_DURATION, Point, round } from '@musical-patterns/utilities'

const formatTimesForDisplay: (parameters: {
    patternDuration: Duration,
    time: Point<Ms>,
}) => {
    patternDurationForDisplay: Duration,
    timeForDisplay: Point<Ms>,
} =
    ({ patternDuration, time }: {
        patternDuration: Duration,
        time: Point<Ms>,
    }): {
        patternDurationForDisplay: Duration,
        timeForDisplay: Point<Ms>,
    } => ({
        patternDurationForDisplay: round(patternDuration) || NO_DURATION,
        timeForDisplay: round(time) || BEGINNING,
    })

export {
    formatTimesForDisplay,
}
