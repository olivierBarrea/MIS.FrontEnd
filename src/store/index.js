
import { createStore } from 'vuex'



const store = createStore({

   state:{
      isAuthenticated: false,
      userName : ''
   },
   mutations: {
    login(state,userName) {
        state.isAuthenticated = true;
        state.userName = userName;
    },
    logout(state) {
        state.isAuthenticated = false;
    }
  },

})

export default store;