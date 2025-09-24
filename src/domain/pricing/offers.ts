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
