import { BasketService } from "../src/application/services/basket.service";
import { DefaultDeliveryRules } from "../src/domain/pricing/deliveryRules";
import { RedWidgetBOGOHalf } from "../src/domain/pricing/offers";
import { DefaultCatalogue } from "../src/infrastructure/data/defaultCatalogue.provider";

describe("Acme Widget Basket", () => {
  const makeBasket = () =>
    new BasketService({
      catalogue: DefaultCatalogue,
      deliveryRules: DefaultDeliveryRules,
      offers: [RedWidgetBOGOHalf],
    });

  test("B01, G01 => $37.85", () => {
    const basket = makeBasket();
    basket.add("B01");
    basket.add("G01");
    expect(basket.total()).toBe(37.85);
  });

  test("R01, R01 => $54.37", () => {
    const basket = makeBasket();
    basket.add("R01");
    basket.add("R01");
    expect(basket.total()).toBe(54.37);
  });

  test("R01, G01 => $60.85", () => {
    const basket = makeBasket();
    basket.add("R01");
    basket.add("G01");
    expect(basket.total()).toBe(60.85);
  });

  test("B01, B01, R01, R01, R01 => $98.27", () => {
    const basket = makeBasket();
    basket.add("B01");
    basket.add("B01");
    basket.add("R01");
    basket.add("R01");
    basket.add("R01");
    expect(basket.total()).toBe(98.27);
  });
});
