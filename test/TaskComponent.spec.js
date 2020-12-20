import { createLocalVue, shallowMount } from '@vue/test-utils'
import Task from '@/components/Task'
import vuetify from 'vuetify'

describe('Task', () => {
  beforeEach(() => {
    const localVue = createLocalVue()
    localVue.use(vuetify)

    wrapper = shallowMount(Task, {
      localVue
    })
  })

  it('renders a vue instance', () => {
    expect(shallowMount(Task).isVueInstance()).toBe(true)
  })
})
