class PresentationEvent {
  #totalPurchaseCost;

  constructor(totalPurchaseCost) {
    this.#totalPurchaseCost = totalPurchaseCost;
  }

  giveChampagne() {
    let discount = 0;
    if (this.#totalPurchaseCost >= 120000) {
      discount += 25000;
    }

    return discount;
  }

  giveBadge(totalBenefitCost) {
    if (totalBenefitCost >= 20000) return 'santa';
    if (totalBenefitCost >= 10000) return 'tree';
    if (totalBenefitCost >= 5000) return 'star';
    return '없음';
  }
}

export default PresentationEvent;
