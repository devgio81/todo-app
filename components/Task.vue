<template>
  <div>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <v-text-field
        v-model="getTitle"
        :rules="[v => !!v || 'Title is required']"
        label="Title"
        required
      />

      <v-textarea
        v-model="getDescription"
        :rules="[v => !!v || 'Description is required']"
        label="Description"
        required
      />

      <v-select
        v-model="getType"
        :items="items"
        :rules="[v => !!v || 'Type is required']"
        label="Type"
        required
      />

      <v-btn
        v-if="isNew"
        :disabled="!valid"
        color="success"
        class="mr-4"
        @click="create"
      >
        Create
      </v-btn>

      <v-btn
        v-else
        :disabled="!valid"
        color="info"
        class="mr-4"
        @click="update"
      >
        Update
      </v-btn>
      <v-btn
        color="error"
        class="mr-4"
        @click="reset"
      >
        Reset Form
      </v-btn>
    </v-form>
  </div>
</template>

<script>
export default {
  name: 'Task',
  props: {
    data: {
      default () {
        return {}
      }
    },

    isNew: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    valid: false,
    title: '',
    description: '',
    type: '',
    done: false,
    items: [
      'call', 'meeting', 'misc'
    ],

    select: 'test2'
  }),

  computed: {
    getType: {
      get () {
        if (this.data.type !== undefined) {
          return this.data.type
        }
        return ''
      },

      set (val) {
        this.type = val
      }
    },
    getTitle: {
      get () {
        if (this.data.title !== undefined) {
          return this.data.title
        }
        return ''
      },

      set (val) {
        this.title = val
      }
    },
    getDescription: {
      get () {
        if (this.data.description !== undefined) {
          return this.data.description
        }
        return ''
      },

      set (val) {
        this.description = val
      }
    }
  },

  methods: {
    reset () {
      this.$refs.form.reset()
    },

    update () {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('todos/updateTodoById', {
          id: this.data.id,
          title: this.title !== '' ? this.title : this.data.title,
          description: this.description !== '' ? this.description : this.data.description,
          type: this.type !== '' ? this.type : this.data.type
        })
      }
    },

    create () {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('todos/createTodo', {
          title: this.title,
          description: this.description,
          type: this.type
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
