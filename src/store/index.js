import { createStore } from 'vuex'

export default createStore({
  state: {
    popup: ""
  },
  mutations: {
    showPopup(state, component) {
      state.popup = component;
    },
    hidePopup(state) {
      state.popup = "";
    }
  },
  actions: {
    
  },
  modules: {
  }
})
