export const threads = state => state.threads

export const currentThread = state => {
  return state.currentThreadID
    ? state.threads[state.currentThreadID]
    : {}
}

export const current = state => state.list.current

export const post = state => state.post

export const keyword = state => {
  return state.keyword
}

export const currentMessages = state => {
  const thread = currentThread(state)
  return thread.messages
    ? thread.messages.map(id => state.messages[id])
    : []
}
