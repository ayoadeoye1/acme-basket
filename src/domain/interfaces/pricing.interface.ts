export interface IPricingStrategy {
  calculateDiscount(
    items: string[],
    getPrice: (code: string) => number
  ): number;
  isApplicable(items: string[]): boolean;
}

export interface IDeliveryStrategy {
  calculateDeliveryFee(subtotal: number): number;
}
