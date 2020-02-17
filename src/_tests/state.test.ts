import { State, Actions } from '~/src/state'

const cacheStub = {
  items: new Map<string, string>(),
  setItem (key: string, value: string) {
    this.items.set(key, value)
  },
  getItem (key: string) {
    return this.items.get(key) ?? null
  },
  clear () {
    this.items.clear()
  }
}

describe('State management', () => {
  beforeEach(() => {
    cacheStub.clear()
  })
  test('State is empty with empty cache', () => {
    const state = State(cacheStub)
    expect(state.thoughts.length).toBe(0)
  })
  test('State is not empty with not empty cache', () => {
    cacheStub.items.set('thoughts', JSON.stringify([{ id: 1, text: 'first' }]))
    const state = State(cacheStub)
    expect(state.thoughts.length).toBe(1)
    expect(state.thoughts[0].text).toBe('first')
  })
  test('Add action add new item to state and cache', () => {
    const state = State(cacheStub)
    const actions = Actions(state)
    expect(state.thoughts.length).toBe(0)
    actions.add('Test')
    expect(state.thoughts.length).toBe(1)
    expect(state.thoughts[0].text).toBe('Test')
    expect(cacheStub.items.size).toBe(1)
  })
  test('Items are capped at capacity', () => {
    const state = State(cacheStub)
    const actions = Actions(state)
    expect(state.thoughts.length).toBe(0)
    for (let index = 0; index < state.capacity * 2; index++) {
      actions.add('Test')
    }
    expect(state.thoughts.length).toBe(state.capacity)
  })
})
