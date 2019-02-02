import {
    calculateNoteSpecsTotalCompiledDuration,
    compilePattern,
    CompilePatternParameters,
    Scale,
} from '@musical-patterns/compiler'
import { ThreadSpec } from '@musical-patterns/performer'
import { logMessageToConsole, Maybe, Time } from '@musical-patterns/utilities'

const logDebugInfo: (compilePatternParameters: CompilePatternParameters) => Promise<void> =
    async (compilePatternParameters: CompilePatternParameters): Promise<void> => {
        const threadSpecs: ThreadSpec[] = await compilePattern(compilePatternParameters)
        logMessageToConsole('thread specs: ', threadSpecs)
        logMessageToConsole('compiled durations: ', threadSpecs.map((threadSpec: ThreadSpec): Time => {
            const scales: Maybe<Scale[]> = compilePatternParameters.material.buildScalesFunction &&
                compilePatternParameters.material.buildScalesFunction(compilePatternParameters.spec)

            return calculateNoteSpecsTotalCompiledDuration(threadSpec.noteSpecs, scales)
        }))
    }

export {
    logDebugInfo,
}
