import {
    calculatePatternTotalCompiledDuration,
    compilePattern,
    CompilePatternParameters,
} from '@musical-patterns/compiler'
import { Note, ThreadSpec } from '@musical-patterns/performer'
import { logMessageToConsole, Ms, sum, to } from '@musical-patterns/utilities'

const logDebugInfo: (compilePatternParameters: CompilePatternParameters) => Promise<void> =
    async (compilePatternParameters: CompilePatternParameters): Promise<void> => {
        const threadSpecs: ThreadSpec[] = await compilePattern(compilePatternParameters)
        logMessageToConsole('thread specs: ', threadSpecs)
        logMessageToConsole(
            'compiled durations per thread spec: ',
            threadSpecs.map((threadSpec: ThreadSpec): Ms =>
                threadSpec.notes ? threadSpec.notes.reduce(
                    (accumulator: Ms, note: Note): Ms =>
                        sum(accumulator, note.duration),
                    to.Ms(0),
                ) : to.Ms(0)),
        )
        logMessageToConsole(
            'total compiled duration: ',
            await calculatePatternTotalCompiledDuration(compilePatternParameters),
        )
    }

export {
    logDebugInfo,
}
