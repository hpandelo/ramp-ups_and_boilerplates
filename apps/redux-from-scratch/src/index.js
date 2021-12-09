import { bugAdded as addBug, removeBug, resolveBug } from './actions'
import store from './store'

const unsubscribe = store.subscribe(() => {
  console.log('Store Changed: ', store.getState())
})

const newBug = addBug('A new bug was added')
store.dispatch(newBug)
store.dispatch(resolveBug(newBug.id))

unsubscribe()
removeBug(1)

console.log(store.getState())

// Store Design
// const store = {
//   bugs: [{
//     id: 1,
//     description: 'Bug 1',
//     resolved: false
//   }],
//   currentUser: {}
// }

// Actions
// ADD a bug
// const ADD_BUG_ACTION = {
//   type: 'ADD_BUG',
//   payload: {
//     description: 'Add a new Bug',
//   },
// }

// RESOLVE a bug
// const RESOLVE_BUG_ACTION = {
//   type: 'RESOLVE_BUG',
//   payload: {
//     id: 1,
//   },
// }

// DELETE a bug
// const DELETE_BUG_ACTION = {
//   type: 'DELETE_BUG',
//   payload: {
//     id: 1,
//   },
// }
