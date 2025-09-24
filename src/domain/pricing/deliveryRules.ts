export type DeliveryRule = {
  thresholdExclusiveUpper: number | null;
  fee: number;
};

export const DefaultDeliveryRules: DeliveryRule[] = [
  { thresholdExclusiveUpper: 50, fee: 4.95 },
  { thresholdExclusiveUpper: 90, fee: 2.95 },
  { thresholdExclusiveUpper: null, fee: 0 },
];
