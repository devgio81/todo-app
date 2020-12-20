<template>
  <div>
    <v-card>
      <v-data-table
        :headers="headers"
        :items="getTodos"
        :search="search"
      >
        <template v-slot:top>
          <v-toolbar
            flat
          >
            <v-toolbar-title>Tasks</v-toolbar-title>
            <v-divider
              class="mx-4"
              inset
              vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              dark
              to="/todos/create"
              class="mb-2"
            >
              New Task
            </v-btn>
          </v-toolbar>
        </template>
        <template v-slot:item.isDone="{ item }">
          <v-switch
            v-model="item.isDone"
            @change="changeStatus(item.id, $event)"
          />
        </template>
        <template v-slot:item.actions="{ item }">
          <router-link
            :to="`/todos/${item.id}`"
          >
            <v-icon
              small
              class="mr-2"
            >
              mdi-pencil
            </v-icon>
          </router-link>
          <v-icon
            style="cursor: pointer"
            small
            @click="deleteTodo(item)"
          >
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Index',
  data: () => ({
    search: '',
    headers: [
      {
        text: 'ID',
        align: 'start',
        sortable: true,
        value: 'id'
      },
      { text: 'Title', value: 'title' },
      { text: 'Description', value: 'description' },
      { text: 'Type', value: 'type' },
      { text: 'Done', value: 'isDone' },
      { text: 'Actions', value: 'actions' }
    ]
  }),

  computed: {
    ...mapGetters('todos', [
      'getTodos'
    ])
  },

  created () {
    this.$store.dispatch('todos/loadTodos')
  },

  methods: {
    changeStatus (id, event) {

    },

    deleteTodo (item) {
      this.$store.dispatch('todos/deleteTodo', item)
    }
  }

}
</script>

<style scoped>

</style>
