import {
    compilePattern,
    CompilePatternParameters,
    computePatternTotalCompiledDuration,
} from '@musical-patterns/compiler'
import { Sound, Voice } from '@musical-patterns/performer'
import { logMessageToConsole, Ms, sum, to } from '@musical-patterns/utilities'

const logDebugInfo: (compilePatternParameters: CompilePatternParameters) => Promise<void> =
    async (compilePatternParameters: CompilePatternParameters): Promise<void> => {
        const voices: Voice[] = await compilePattern(compilePatternParameters)
        logMessageToConsole('voices: ', voices)
        logMessageToConsole(
            'compiled durations per voice: ',
            voices.map((voice: Voice): Ms =>
                voice.sounds ? voice.sounds.reduce(
                    (accumulator: Ms, sound: Sound): Ms =>
                        sum(accumulator, sound.duration),
                    to.Ms(0),
                ) : to.Ms(0)),
        )
        logMessageToConsole(
            'total compiled duration: ',
            await computePatternTotalCompiledDuration(compilePatternParameters),
        )
    }

export {
    logDebugInfo,
}
