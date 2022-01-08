class ColorRandomizer {
  mapping;

  arr;

  constructor() {
    this.mapping = new Map();
    this.arr = ['#fa8ef7', '#a5d2ee', '#e8bd4b', '#f098b1'];
  }

  getColor(id) {
    if (this.mapping.has(id)) {
      return this.mapping.get(id);
    }
    const color = this.arr[Math.floor(Math.random() * this.arr.length)];
    this.mapping.set(id, color);
    return color;
  }
}

export default new ColorRandomizer();
