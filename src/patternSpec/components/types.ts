// tslint:disable:max-file-line-count

import {
    Constraint,
    OptionedConstraint,
    PatternSpec,
    PatternSpecAttributes,
    PatternSpecPropertyAttributes,
    PatternSpecPropertyType,
    RangedConstraint,
} from '@musical-patterns/pattern'
import { DictionaryOf, Maybe } from '@musical-patterns/utilities'
import { DomValue } from '../../types'
import { PatternSpecControlEventAttacher, PatternSpecControlEventExtractor, PresetSubmitHandler } from '../events'
import { ImmutablePatternSpecState } from '../state'

interface PatternSpecControlsPropsFromState {
    patternSpecState: ImmutablePatternSpecState,
}

interface PatternSpecControlsPropsFromDispatch {
    handlePatternSpecBlur: PatternSpecControlEventExtractor,
    handlePatternSpecButtonSubmit: PatternSpecControlEventExtractor,
    handlePatternSpecChange: PatternSpecControlEventExtractor,
    handlePatternSpecKeyboardSubmit: PatternSpecControlEventExtractor,
}

interface PatternSpecControlsProps extends PatternSpecControlsPropsFromState, PatternSpecControlsPropsFromDispatch {}

interface PatternSpecControlProps {
    patternSpecControlsProps: PatternSpecControlsProps,
    patternSpecKey: string,
    patternSpecPropertyAttributes: PatternSpecPropertyAttributes,
}

interface PatternSpecPropsFromState {
    defaultPatternSpec: PatternSpec,
    presets: Maybe<DictionaryOf<PatternSpec>>,
    submittedPatternSpec: PatternSpec,
}

interface PatternSpecPropsFromDispatch {
    resetHandler: (patternSpec: PatternSpec) => void,
}

interface PatternSpecProps extends PatternSpecPropsFromState, PatternSpecPropsFromDispatch {}

enum PatternSpecControlStates {
    INVALID = 'invalid',
    UNSUBMITTED = 'unsubmitted',
    VALID_AND_SUBMITTED = 'valid-and-submitted',
}

interface ControlProps {
    className: string,
    onBlur: PatternSpecControlEventAttacher,
    onChange: PatternSpecControlEventAttacher,
    onKeyPress: PatternSpecControlEventAttacher,
    patternSpecKey: string,
    patternSpecValue: DomValue | boolean,
}

interface OptionedControlProps extends ControlProps {
    constraint: OptionedConstraint,
    patternSpecValue: DomValue,
}

interface RangedControlProps extends ControlProps {
    constraint: RangedConstraint,
    patternSpecValue: DomValue,
}

interface ToggledControlProps extends ControlProps {
    patternSpecValue: boolean,
}

interface BuildControlsProps {
    patternSpecAttributes: PatternSpecAttributes,
    patternSpecControlsProps: PatternSpecControlsProps,
    patternSpecKeys: string[],
}

interface PresetsPropsFromDispatch {
    presetSubmitHandler: PresetSubmitHandler,
}

interface PresetsProps extends PresetsPropsFromDispatch {
    presets: DictionaryOf<PatternSpec>,
    submittedPatternSpec: PatternSpec,
}

interface BuildControlProps {
    constraint: Maybe<Constraint>,
    controlProps: ControlProps,
    propertyType: PatternSpecPropertyType,
}

export {
    PatternSpecControlProps,
    PatternSpecControlsProps,
    PatternSpecControlsPropsFromDispatch,
    PatternSpecControlsPropsFromState,
    PatternSpecPropsFromState,
    PatternSpecPropsFromDispatch,
    PatternSpecProps,
    PatternSpecControlStates,
    ControlProps,
    OptionedControlProps,
    RangedControlProps,
    BuildControlsProps,
    PresetsProps,
    PresetsPropsFromDispatch,
    BuildControlProps,
    ToggledControlProps,
}
