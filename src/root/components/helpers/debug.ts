import { compilePattern, CompilePatternParameters } from '@musical-patterns/compiler'
import { Note, ThreadSpec } from '@musical-patterns/performer'
import { from, logMessageToConsole, Time, to } from '@musical-patterns/utilities'

const logDebugInfo: (compilePatternParameters: CompilePatternParameters) => Promise<void> =
    async (compilePatternParameters: CompilePatternParameters): Promise<void> => {
        const threadSpecs: ThreadSpec[] = await compilePattern(compilePatternParameters)
        logMessageToConsole('thread specs: ', threadSpecs)
        logMessageToConsole('compiled durations: ', threadSpecs.map((threadSpec: ThreadSpec): Time =>
            threadSpec.notes ? threadSpec.notes.reduce(
                (accumulator: Time, note: Note): Time =>
                    to.Time(from.Time(accumulator) + from.Time(note.duration)),
                to.Time(0),
            ) : to.Time(0)),
        )
    }

export {
    logDebugInfo,
}
