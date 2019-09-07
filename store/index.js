import metadata from '../static/metadata.json';

export const state = () => ({
  posts: [],
  post: ''
})

export const mutations = {
  setPosts(state, data) {
    state.posts = data;
  },
  setPost(state, name) {
    state.post = name;
  }
}

export const actions = {
  LOAD_POSTS({ commit }) {
    const posts = metadata.posts;
    commit('setPosts', posts);
  },
  LOAD_POST({ commit }, postName) {
    commit('setPost', postName);
  }
}
