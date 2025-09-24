import { Product } from "../../domain/models/product";

export const DefaultCatalogue: Readonly<Record<string, Product>> = {
  R01: { code: "R01", name: "Red Widget", price: 32.95 },
  G01: { code: "G01", name: "Green Widget", price: 24.95 },
  B01: { code: "B01", name: "Blue Widget", price: 7.95 },
};
