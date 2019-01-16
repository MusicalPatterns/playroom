const doubleStringifyIfOptioned: (value: string, patternSpecPropertyTypeIsOptioned?: boolean) => string =
    (value: string, patternSpecPropertyTypeIsOptioned: boolean = false): string =>
        patternSpecPropertyTypeIsOptioned ? JSON.stringify(value) : value

export {
    doubleStringifyIfOptioned,
}
