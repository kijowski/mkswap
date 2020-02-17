import jsdom from 'jsdom'
import mq from 'mithril-query'
import { HelpModal, openHelp, renderHelpModal } from '~/src/help'

const dom = new jsdom.JSDOM('', {
  // So we can get `requestAnimationFrame`
  pretendToBeVisual: true
})

describe('Help component', () => {
  beforeAll(() => {
    // Fill in the globals Mithril needs to operate. Also, the first two are often
    // useful to have just in tests.
    // @ts-ignore
    global.window = dom.window
    // @ts-ignore
    global.document = dom.window.document
    // @ts-ignore
    global.requestAnimationFrame = dom.window.requestAnimationFrame

    // Require Mithril to make sure it loads properly.
    require('mithril')
  })

  afterAll(() => {
    dom.window.close()
  })

  test('HelpModal have correct structure', () => {
    const state = mq(HelpModal)
    state.should.have('.modal')
  })

  test('HelpModal should not be visible by default', () => {
    const state = renderHelpModal()
    expect(state).toBeFalsy()
  })

  test('HelpModal should be visible after enabling', () => {
    const state = renderHelpModal()
    expect(state).toBeFalsy()
    openHelp()
    const stateAfterCall = renderHelpModal()
    expect(stateAfterCall).toBeTruthy()
  })
})
