class ChristmasDdayEvent {
  #date;
  #discount;

  constructor(date) {
    this.#date = date;
    this.#discount = 1000;
  }
  #validateDate() {
    return this.#date > 25;
  }
  calculateDdayDiscount() {
    if (this.#validateDate(this.#date)) return 0;
    const additionalDiscount = this.#date * 100;
    const discount = this.#discount + additionalDiscount - 100;

    return discount;
  }
}

export default ChristmasDdayEvent;
