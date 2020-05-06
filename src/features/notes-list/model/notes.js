import { notesMock } from '@/utils/notesMock';

const state = {
  notes: [],
};

const getters = {};

const actions = {
  async updateTodo({ commit }, data) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    commit('updateTodo', data);
  },
  async addNote({ commit }, newNote) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    commit('addNote', newNote);
  },
  async getNotes({ commit }) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    commit('setNotes', notesMock);
  },
  async deleteNote({ commit }, _id) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    commit('deleteNote', _id);
  },
};

const mutations = {
  addNote(state, payload) {
    if (state.notes.length === 0) {
      state.notes.push({ ...{id: 1}, ...payload });
    } else {
      state.notes.push({ ...{id: state.notes[state.notes.length - 1].id + 1 }, ...payload });
    }
  },
  setNotes(state, payload) {
    state.notes = payload;
  },
  updateTodo(state, { _id, todo }) {
    state.notes = state.notes.map((el, key) => {
      if (key === _id) {
        el.title = todo.title;
        el.todos = todo.todos;
        return el;
      }
      return el;
    });
  },
  deleteNote(state, _id) {
    state.notes = state.notes.filter(
      el => el.id !== _id,
    );
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
