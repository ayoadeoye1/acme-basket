export type Catalogue = Readonly<
  Record<string, { code: string; name: string; price: number }>
>;

export type DeliveryRule = {
  thresholdExclusiveUpper: number | null;
  fee: number;
};

export type Offer = {
  applies: (items: string[]) => boolean;
  apply: (items: string[], getPrice: (code: string) => number) => number;
};

export const RedWidgetBOGOHalf: Offer = {
  applies: (items) => items.filter((c) => c === "R01").length >= 2,
  apply: (items, getPrice) => {
    const redCount = items.filter((c) => c === "R01").length;
    const pairs = Math.floor(redCount / 2);
    const halfPrice = getPrice("R01") / 2;
    return Number((pairs * halfPrice).toFixed(2));
  },
};

export const DefaultDeliveryRules: DeliveryRule[] = [
  { thresholdExclusiveUpper: 50, fee: 4.95 },
  { thresholdExclusiveUpper: 90, fee: 2.95 },
  { thresholdExclusiveUpper: null, fee: 0 },
];
