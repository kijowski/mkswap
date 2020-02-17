interface CacheProvider {
  getItem(item: string): string | null
  setItem(key: string, item: string): void
  clear(): void
}

export interface State {
  cache: CacheProvider
  maxId: number
  capacity: number
  thoughts: Array<{id: number, text: string}>
}

export const State = (cache: CacheProvider = window.sessionStorage): State => {
  const cachedThoughts = cache.getItem('thoughts')
  if (cachedThoughts == null) {
    return {
      cache,
      maxId: 0,
      capacity: 9,
      thoughts: []
    }
  }
  const thoughts: Array<{id: number, text: string}> = JSON.parse(cachedThoughts)
  return {
    cache,
    thoughts,
    maxId: thoughts[0].id + 1,
    capacity: 9
  }
}

export const Actions = (state: State) => ({
  add: (text: string) => {
    state.thoughts.unshift({ id: state.maxId, text })
    state.maxId += 1
    if (state.thoughts.length > state.capacity) {
      state.thoughts.pop()
    }
    state.cache.setItem('thoughts', JSON.stringify(state.thoughts))
  }
})

export type Actions = ReturnType<typeof Actions>
