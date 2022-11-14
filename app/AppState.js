import { Note } from "./Models/Note.js"
import { Value } from "./Models/Value.js"
import { EventEmitter } from "./Utils/EventEmitter.js"
import { isValidProp } from "./Utils/isValidProp.js"
import { loadState } from "./Utils/Store.js"

class AppState extends EventEmitter {
  /** @type {import('./Models/Value').Value[]} */
  values = loadState('values', [Value])

  // /** @type {import('./Models/Note').Note[]} */
  // notes = loadState('notes', [Note])

  /** @type {import('./Models/Note.js').Note[]} */
  notes = loadState('notes', [Note])
  // notes = [
  //   new Note({ name: 'HTML', date: '11/11/22', color: 'red' }),
  //   new Note({ name: 'HTML', date: '11/11/22', color: 'red' })
  // ]

  // /** @type {import('./Models/Note.js').Note} */

  // notes = loadState('notes', [Note])
  activeNote = null
  // savedNote = 0
  // notes = 0

}

export const appState = new Proxy(new AppState(), {
  get(target, prop) {
    isValidProp(target, prop)
    return target[prop]
  },
  set(target, prop, value) {
    isValidProp(target, prop)
    target[prop] = value
    target.emit(prop, value)
    return true
  }
})
