const { localStorage } = window

export function backup(key, state) {
  localStorage.setItem(key, JSON.stringify(state))
}

export function restore(key) {
  return JSON.parse(localStorage.getItem(key))
}
