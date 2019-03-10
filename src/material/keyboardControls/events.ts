import { KeyCode } from './types'

const clickTimeControl: (timeControlName: string) => boolean =
    (timeControlName: string): boolean => {
        const timeControl: HTMLDivElement | null = document.querySelector(`#${timeControlName}`)
        if (timeControl) {
            timeControl.click()
        }

        return !!timeControl
    }

const onKeyDown: (event: KeyboardEvent) => Promise<void> =
    async (event: KeyboardEvent): Promise<void> => {
        // tslint:disable-next-line deprecation
        switch (event.keyCode) {
            case KeyCode.SPACE:
                event.preventDefault()

                if (!clickTimeControl('play')) {
                    clickTimeControl('pause')
                }
                break
            case KeyCode.ESCAPE:
                clickTimeControl('stop')
                break
            case KeyCode.HOME:
                clickTimeControl('rewind')
                break
            default:
        }
    }

export {
    onKeyDown,
}
