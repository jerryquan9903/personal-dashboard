import { createStore } from 'vuex'

export default createStore({
  state: {
    popupOnShow: {
      show: false,
      popup: ""
    }
  },
  mutations: {
    showPopup(state, component) {
      state.popupOnShow.show = true;
      state.popupOnShow.popup = component;
    },
    hidePopup(state) {
      state.popupOnShow = false;
    }
  },
  actions: {
    
  },
  modules: {
  }
})
