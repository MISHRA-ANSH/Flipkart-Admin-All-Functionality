export function getDiscount(price, basePrice) {
    return Math.ceil((1 - price / basePrice) * 100, 2);
  }
  