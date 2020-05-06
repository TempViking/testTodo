import Vue from 'vue';
import Vuex from 'vuex';
import { notes } from '@/features/notes-list/init';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    notes,
  },
});
