import post_id_array from '../content/url-map.json';

export const state = () => ({
  post_id_array: [],
  post_id: ''
})

export const mutations = {
  setPostIds(state, posts) {
    state.post_id_array = posts;
  },
  setPostId(state, id) {
    state.post_id = id;
  }
}

export const actions = {
  LOAD_POSTS_ID_ARRAY({ commit }) {
    commit('setPostIds', post_id_array.ids);
  },
  LOAD_POST_ID({ commit }, id) {
    commit('setPostId', id);
  }
}
