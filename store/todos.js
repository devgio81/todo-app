export const state = () => ({
  list: [],
  todo: {}
})

export const mutations = {

  SET_LIST (state, payload) {
    state.list = payload
  },

  SET_TODO (state, payload) {
    state.todo = payload
  }
}

export const actions = {

  async loadTodos ({ commit }) {
    try {
      const data = await this.$axios.$get('/tasks')
      commit('SET_LIST', data)
    } catch (err) {
      console.log(err)
    }
  },

  async loadTodoById ({ commit }, id) {
    try {
      const data = await this.$axios.$get('/tasks/' + id)
      commit('SET_TODO', data)
    } catch (err) {
      console.log(err)
    }
  },

  async deleteTodo ({ commit, dispatch }, task) {
    try {
      await this.$axios.$delete('/tasks/' + task.id)
      dispatch('loadTodos')
    } catch (err) {
      console.log(err)
    }
  },

  async createTodo ({ commit }, data) {
    try {
      await this.$axios.$post('/tasks', {
        title: data.title,
        description: data.description,
        type: data.type,
        isDone: false
      })
      this.$router.push('/todos')
    } catch (err) {
      console.log(err)
    }
  },

  async changeStatus ({ commit }, data) {
    try {
      await this.$axios.$post('/tasks/status/' + data.id + '/' + (data.status ? 1 : 0))
    } catch (err) {
      console.log(err)
    }
  },

  async updateTodoById ({ commit }, data) {
    try {
      const res = await this.$axios.$put('/tasks/' + data.id, {
        title: data.title,
        description: data.description,
        type: data.type,
        isDone: data.isDone
      })
      commit('SET_TODO', res)
      this.$router.push('/todos')
    } catch (err) {
      console.log(err)
    }
  }
}

export const getters = {
  getTodos: state => state.list,
  getTodo: state => state.todo
}
