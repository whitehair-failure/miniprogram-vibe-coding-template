import { createApp, onAppShow, onAppHide, onAppError } from '@vue-mini/core'

createApp({
  setup() {
    onAppShow(() => {
      console.log('show')
    })
    onAppHide(() => {
      console.log('hide')
    })
    onAppError(() => {
      console.log('error')
    })

    const greeting = 'Hello World!'

    return {
      greeting,
    }
  },
})