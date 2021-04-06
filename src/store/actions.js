import { ADD_COUNTER, ADD_TO_CART } from "./mutation_types"

export default {
  addCart({ state, commit }, payload) {
    return new Promise((resolve) => {
      let product = state.cateList.find(item => item.id === payload.id)

      if (product) {
        commit(ADD_COUNTER, product)
        resolve('当前商品数量+1')
      } else {
        commit(ADD_TO_CART, payload)
        resolve('添加了新商品')
      }
    })
  }
}