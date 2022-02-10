import { createStore } from "vuex";

export default createStore({
  state: {
    currentMap:"ol"
  },
  mutations: {
    setCurrentMap(state,val){
      state.currentMap=val;
    }
  },
  actions: {},
  modules: {},
});
