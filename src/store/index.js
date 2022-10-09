import { createStore } from 'vuex'
import axios from 'axios'
axios.defaults.baseURL = 'https://63426a82ba4478d4783b9e42.mockapi.io'

export default createStore({

  state: {
    data: [],
    single: {}
  },

  getters: {
    NEWS (state) {
      // state.data.map(e => e.rating = Math.floor(Math.random() * 5 + 1))
      state.data.map(e => e.rating = 4)
      state.data.map(e => e.url = e.title.replace(/\s+/g, '-').toLowerCase())
      state.data.map(e => e.img = "https://via.placeholder.com/300")
      state.data.map(e => e.date= new Date(e.date).toLocaleDateString("en-US"))
      return state.data;
    },

    SINGLE_NEWS (state) {
      state.single.img = "https://via.placeholder.com/300";
      state.single.date = new Date(state.single.date).toLocaleDateString("en-US");
      return state.single;
    }
  },

  mutations: {
    SET_NEWS (state, data) {
      state.data = state.data.concat(data);
    },
    
    SET_SINGLE_NEWS (state, data) {
      state.single = data;
    },
    
    CLEAR_NEWS (state) {
      state.data = []
    },
    
    CLEAR_SINGLE_NEWS (state) {
      state.single = {}
    }
  },

  actions: {
    GET_NEWS: async (context, params) => {
      let params_str;
      if (params) {
        params_str = Object.keys(params).map(key => key + '=' + params[key]).join('&');
        let {data} = await axios.get('/news?' + params_str);
        context.commit('SET_NEWS', data);
      } else {
        let {data} = await axios.get('/news');
        context.commit('SET_NEWS', data);
      }
    },
    
    GET_SINGLE_NEWS: async (context, params) => {
      let {data} = await axios.get('/news/' + params.id);
      context.commit('SET_SINGLE_NEWS', data);
    },

    CLEAR_NEWS (context) {
      context.commit('CLEAR_NEWS');
    },

    CLEAR_SINGLE_NEWS (context) {
      context.commit('CLEAR_SINGLE_NEWS');
    },
  }
})