/** Keep in sync with api/utils/deliveryFee.ts */
export const FREE_DELIVERY_THRESHOLD = 25;
export const DELIVERY_FEE = 3;

export const getDeliveryFee = (itemsSubtotal: number): number => {
  if (itemsSubtotal >= FREE_DELIVERY_THRESHOLD) {
    return 0;
  }
  return DELIVERY_FEE;
};

export const getOrderTotal = (itemsSubtotal: number): number => {
  return itemsSubtotal + getDeliveryFee(itemsSubtotal);
};
