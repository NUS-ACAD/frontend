import pp1 from '../assets/images/pp1.png';
import pp2 from '../assets/images/pp2.png';
import pp3 from '../assets/images/pp3.png';
import pp4 from '../assets/images/pp4.png';
import pp5 from '../assets/images/pp5.png';

class ProfilePicRandomizer {
  mapping;

  arr;

  constructor() {
    this.mapping = new Map();
    this.arr = [pp1, pp2, pp3, pp4, pp5];
  }

  getProfilePicture(id) {
    if (this.mapping.has(id)) {
      return this.mapping.get(id);
    }
    const pic = this.arr[Math.floor(Math.random() * this.arr.length)];
    this.mapping.set(id, pic);
    return pic;
  }
}

export default new ProfilePicRandomizer();
