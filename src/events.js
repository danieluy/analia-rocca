export default {
  events: {},
  on(evt, fn) {
    this.events[evt] = this.events[evt] || [];
    this.events[evt].push(fn);
  },
  off(evt, fn) {
    if (this.events[evt])
      for (let i = 0; i < this.events[evt].length; i++)
        if (this.events[evt][i] === fn) {
          this.events[evt].splice(i, 1);
          break;
        }
  },
  emit(evt, data) {
    if (this.events[evt])
      this.events[evt].forEach((fn) => { fn(data); });
  }
};
