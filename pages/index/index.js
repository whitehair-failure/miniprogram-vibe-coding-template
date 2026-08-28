const STORAGE_ITEMS_KEY = 'todo_items';
const STORAGE_FILTER_KEY = 'todo_filter';

Page({
  data: {
    text: '',
    items: [],
    filter: 'all',
    total: 0,
    completed: 0,
    active: 0,
    filteredItems: [],
  },

  onLoad() {
    // 加载本地保存的状态
    let items = [];
    let filter = 'all';

    try {
      const savedItems = wx.getStorageSync(STORAGE_ITEMS_KEY);
      if (Array.isArray(savedItems)) {
        items = savedItems.map((i) => ({
          id: i.id,
          text: i.text,
          done: !!i.done,
        }));
      }
    } catch (e) {}

    try {
      const savedFilter = wx.getStorageSync(STORAGE_FILTER_KEY);
      if (
        savedFilter === 'active' ||
        savedFilter === 'done' ||
        savedFilter === 'all'
      ) {
        filter = savedFilter;
      }
    } catch (e) {}

    this.setData({ items, filter });
    this.recalc();
  },

  // 根据 items / filter 派生 total / completed / active / filteredItems
  recalc() {
    const { items, filter } = this.data;
    const total = items.length;
    const completed = items.filter((i) => i.done).length;
    const active = total - completed;

    let filteredItems = items;
    if (filter === 'active') {
      filteredItems = items.filter((i) => !i.done);
    } else if (filter === 'done') {
      filteredItems = items.filter((i) => i.done);
    }

    this.setData({ total, completed, active, filteredItems });
  },

  saveState() {
    try {
      wx.setStorageSync(STORAGE_ITEMS_KEY, this.data.items);
      wx.setStorageSync(STORAGE_FILTER_KEY, this.data.filter);
    } catch (e) {}
  },

  onInput(e) {
    this.setData({ text: e.detail.value });
  },

  addItem() {
    const v = (this.data.text || '').trim();
    if (!v) return;
    const items = [{ id: Date.now(), text: v, done: false }, ...this.data.items];
    this.setData({ items, text: '' });
    this.saveState();
    this.recalc();
  },

  submitOnConfirm() {
    this.addItem();
  },

  toggleDone(e) {
    const id = String(e.currentTarget.dataset.id);
    const items = this.data.items.map((item) =>
      String(item.id) === id ? { ...item, done: !item.done } : item,
    );
    this.setData({ items });
    this.saveState();
    this.recalc();
  },

  removeItem(e) {
    const id = String(e.currentTarget.dataset.id);
    const items = this.data.items.filter((i) => String(i.id) !== id);
    this.setData({ items });
    this.saveState();
    this.recalc();
  },

  setFilter(e) {
    const filter = e.currentTarget.dataset.value;
    this.setData({ filter });
    this.saveState();
    this.recalc();
  },

  clearCompleted() {
    const items = this.data.items.filter((i) => !i.done);
    this.setData({ items });
    this.saveState();
    this.recalc();
  },
});
