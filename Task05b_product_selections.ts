import {
  getProductsInStore,
  addProductSelectionToStore,
} from "./handson/store";
import {
  getProductSelectionByKey,
  createProductSelection,
  addProductsToProductSelection,
  getProductsInProductSelection,
} from "./handson/productSelections";

import { log } from "./utils/logger";

const productSelectionKey = "tt-berlin-store-selection";

// createProductSelection(productSelectionKey, "Berlin Store Selection").then(log).catch(log);

// getProductSelectionByKey(productSelectionKey).then(log).catch(log);

// addProductsToProductSelection(productSelectionKey, ["72309"])
//   .then(log)
//   .catch(log);

// getProductsInProductSelection(productSelectionKey).then(log).catch(log);

// addProductSelectionToStore("berlin-store", productSelectionKey)
// addProductSelectionToStore("europe", productSelectionKey).then(log).catch(log);

// getProductsInStore("berlin-store").then(log).catch(log);
getProductsInStore("europe").then(log).catch(log);
