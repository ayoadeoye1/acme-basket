import { Product } from "../models/product";

export interface ICatalogueRepository {
  findProduct(code: string): Product | undefined;
  getAllProducts(): ReadonlyMap<string, Product>;
}
