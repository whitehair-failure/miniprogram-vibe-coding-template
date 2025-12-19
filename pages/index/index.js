import { definePage, ref } from '@vue-mini/core'

definePage(() => {
  const count = ref(0)
  const text = ref('')
  const items = ref([])

  function increment() {
    count.value++
  }

  function onInput(e) {
    text.value = e.detail.value
  }

  function addItem() {
    const v = (text.value || '').trim()
    if (!v) return
    items.value.push({ id: Date.now(), text: v })
    text.value = ''
  }

  function removeItem(e) {
    const id = e.currentTarget.dataset.id
    items.value = items.value.filter(i => String(i.id) !== String(id))
  }

  return {
    count,
    increment,
    text,
    items,
    onInput,
    addItem,
    removeItem,
  }
})