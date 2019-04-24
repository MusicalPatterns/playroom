import { BEGINNING, Ms, NO_DURATION, Point, round, Translation } from '@musical-patterns/utilities'

const formatTimesForDisplay: (parameters: {
    patternDuration: Translation<Ms>,
    timePosition: Point<Ms>,
}) => {
    patternDurationForDisplay: Translation<Ms>,
    timePositionForDisplay: Point<Ms>,
} =
    ({ patternDuration, timePosition }: {
        patternDuration: Translation<Ms>,
        timePosition: Point<Ms>,
    }): {
        patternDurationForDisplay: Translation<Ms>,
        timePositionForDisplay: Point<Ms>,
    } => ({
        patternDurationForDisplay: round(patternDuration) || NO_DURATION,
        timePositionForDisplay: round(timePosition) || BEGINNING,
    })

export {
    formatTimesForDisplay,
}
