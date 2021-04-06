import {ADD_COUNTER, ADD_TO_CART} from "./mutation_types"

export default {
  [ADD_COUNTER](state, payload) {
    payload.count += 1
  },
  [ADD_TO_CART](state, payload) {
    payload.count = 1
    payload.isChecked = true
    state.cateList.push(payload)
  }
}