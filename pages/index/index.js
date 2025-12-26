import { computed, definePage, ref } from "@vue-mini/core";

definePage(() => {
  const text = ref("");
  const items = ref([]);
  const filter = ref("all");

  const STORAGE_ITEMS_KEY = "todo_items";
  const STORAGE_FILTER_KEY = "todo_filter";

  const total = computed(() => items.value.length);
  const completed = computed(() => items.value.filter((i) => i.done).length);
  const active = computed(() => total.value - completed.value);

  const filteredItems = computed(() => {
    if (filter.value === "active") return items.value.filter((i) => !i.done);
    if (filter.value === "done") return items.value.filter((i) => i.done);
    return items.value;
  });

  function saveState() {
    try {
      wx.setStorageSync(STORAGE_ITEMS_KEY, items.value);
      wx.setStorageSync(STORAGE_FILTER_KEY, filter.value);
    } catch (e) {}
  }

  function onInput(e) {
    text.value = e.detail.value;
  }

  function addItem() {
    const v = (text.value || "").trim();
    if (!v) return;
    items.value = [{ id: Date.now(), text: v, done: false }, ...items.value];
    text.value = "";
    saveState();
  }

  function submitOnConfirm() {
    addItem();
  }

  function toggleDone(e) {
    const id = String(e.currentTarget.dataset.id);
    items.value = items.value.map((item) =>
      String(item.id) === id ? { ...item, done: !item.done } : item
    );
    saveState();
  }

  function removeItem(e) {
    const id = String(e.currentTarget.dataset.id);
    items.value = items.value.filter((i) => String(i.id) !== id);
    saveState();
  }

  function setFilter(e) {
    filter.value = e.currentTarget.dataset.value;
    saveState();
  }

  function clearCompleted() {
    items.value = items.value.filter((i) => !i.done);
    saveState();
  }

  // load saved state
  try {
    const savedItems = wx.getStorageSync(STORAGE_ITEMS_KEY);
    if (Array.isArray(savedItems)) {
      items.value = savedItems.map((i) => ({
        id: i.id,
        text: i.text,
        done: !!i.done,
      }));
    }
  } catch (e) {}

  try {
    const savedFilter = wx.getStorageSync(STORAGE_FILTER_KEY);
    if (
      savedFilter === "active" ||
      savedFilter === "done" ||
      savedFilter === "all"
    ) {
      filter.value = savedFilter;
    }
  } catch (e) {}

  return {
    text,
    items,
    filter,
    total,
    active,
    completed,
    filteredItems,
    onInput,
    addItem,
    submitOnConfirm,
    toggleDone,
    removeItem,
    setFilter,
    clearCompleted,
  };
});
