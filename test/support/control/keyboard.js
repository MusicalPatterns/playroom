import { testGlobals } from '../../setup'

const press = async key => await testGlobals.page.keyboard.press(key)

export {
    press,
}
