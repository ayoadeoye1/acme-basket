import { Product } from "../../domain/models/product";
import { DeliveryRule } from "../../domain/pricing/deliveryRules";
import { Offer } from "../../domain/pricing/offers";

export type Catalogue = Readonly<Record<string, Product>>;

export class BasketService {
  private readonly catalogue: Catalogue;
  private readonly deliveryRules: DeliveryRule[];
  private readonly offers: Offer[];
  private readonly items: string[] = [];

  constructor(params: {
    catalogue: Catalogue;
    deliveryRules: DeliveryRule[];
    offers?: Offer[];
  }) {
    this.catalogue = params.catalogue;
    this.deliveryRules = [...params.deliveryRules].sort((a, b) => {
      const au = a.thresholdExclusiveUpper ?? Infinity;
      const bu = b.thresholdExclusiveUpper ?? Infinity;
      return au - bu;
    });
    this.offers = params.offers ?? [];
  }

  add(productCode: string): void {
    if (!this.catalogue[productCode]) {
      throw new Error(`Unknown product code: ${productCode}`);
    }
    this.items.push(productCode);
  }

  total(): number {
    const getPrice = (code: string) => this.catalogue[code].price;

    const subtotal = this.items.reduce((sum, code) => sum + getPrice(code), 0);

    const discount = this.offers
      .filter((o) => o.applies(this.items))
      .reduce((sum, o) => sum + o.apply(this.items, getPrice), 0);

    const afterDiscount = subtotal - discount;

    const deliveryFee = this.computeDeliveryFee(afterDiscount);

    const total = afterDiscount + deliveryFee;

    return Number(total.toFixed(2));
  }

  private computeDeliveryFee(amount: number): number {
    for (const rule of this.deliveryRules) {
      const upper = rule.thresholdExclusiveUpper ?? Infinity;
      if (amount < upper) return rule.fee;
    }
    return 0;
  }
}
