<template>
  <Task :data="getTodo" />
</template>

<script>
import { mapGetters } from 'vuex'
import Task from '@/components/Task'
export default {
  name: 'Id',

  components: { Task },

  data: () => ({
    todoId: 0
  }),
  computed: {
    ...mapGetters('todos', [
      'getTodo'
    ])
  },

  created () {
    this.$store.dispatch('todos/loadTodoById', this.$route.params.id)
  }
}
</script>

<style scoped>

</style>
