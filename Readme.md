# Acme Widget – Basket POC

Modular implementation of a shopping basket for Acme Widget Co with delivery rules and special offers.

## Features

- Simple `Basket` API: `add(code)`, `total()`
- Configurable product catalogue, delivery rules, and offers
- Built-in offer: Buy one Red Widget (`R01`), get the second half price
- Unit tests for the provided examples

## Getting Started

```bash
npm install
npm test
```

## Usage

```ts
import { BasketService } from "./src/application/services/basket.service";
import { DefaultCatalogue } from "./src/infrastructure/catalogue/defaultCatalogue.provider";
import { DefaultDeliveryRules } from "./src/domain/pricing/deliveryRules";
import { RedWidgetBOGOHalf } from "./src/domain/pricing/offers";

const basket = new BasketService({
  catalogue: DefaultCatalogue,
  deliveryRules: DefaultDeliveryRules,
  offers: [RedWidgetBOGOHalf],
});

basket.add("B01");
basket.add("G01");
console.log(basket.total());
```

## Assumptions

- Prices are in USD and represented as numbers rounded to 2 decimals.
- Delivery fee tiers:
  - Under $50 → $4.95
  - Under $90 → $2.95
  - $90 or more → free
- Red widget offer applies per pair: for every two `R01`, one is half-price.

## Scripts

- `npm test` – run unit tests
- `npm run build` – compile to `dist/`
