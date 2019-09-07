import metadata from '../static/metadata.json';

export const state = () => ({
  posts: [],
  post: ''
})

export const mutations = {
  setPosts(state, posts) {
    state.posts = posts;
  },
  setPost(state, post) {
    state.post = post;
  }
}

export const actions = {
  LOAD_POSTS({ commit }) {
    const posts = metadata.posts;
    commit('setPosts', posts);
  },
  LOAD_POST({ commit }, id) {
    const post = metadata.posts.filter((post) => post.id === id)[0]
    commit('setPost', post);
  }
}
