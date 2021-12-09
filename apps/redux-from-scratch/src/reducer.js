import { BUG_ADDED, BUG_REMOVED, BUG_RESOLVED } from './actionTypes'

let lastId = 0

const reducer = (state = [], action) => {
  const { payload, type } = action
  switch (type) {
    case BUG_ADDED:
      return [
        ...state,
        {
          id: ++lastId,
          description: payload.description,
          resolved: false,
        },
      ]

    case BUG_REMOVED:
      return state.filter((bug) => bug.id !== payload.id)

    case BUG_RESOLVED:
      return state.map((bug) => (bug.id === payload.id ? { ...bug, resolved: true } : bug))

    default:
      return state
  }
}

export default reducer
