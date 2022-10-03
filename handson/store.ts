import {
  Cart,
  ClientResponse,
  Customer,
  CustomerPagedQueryResponse,
  ProductsInStorePagedQueryResponse,
  Store,
} from "@commercetools/platform-sdk";
import { apiRoot, storeApiRoot } from "./client";

//TODO: update client.ts file

export const getStoreByKey = (key: string): Promise<ClientResponse<Store>> => {
  return apiRoot.stores().withKey({ key: key }).get().execute();
};

export const getCustomersInStore = (
  storeKey: string
): Promise<ClientResponse<CustomerPagedQueryResponse>> => {
  return apiRoot
    .inStoreKeyWithStoreKeyValue({ storeKey: storeKey })
    .customers()
    .get()
    .execute();
};

export const addProductSelectionToStore = (
  storeKey: string,
  productSelectionKey: string
): Promise<ClientResponse<Store>> => {
  return getStoreByKey(storeKey).then((store) =>
    apiRoot
      .stores()
      .withKey({ key: storeKey })
      .post({
        body: {
          version: store.body.version,
          actions: [
            {
              action: "addProductSelection",
              productSelection: {
                key: productSelectionKey,
                typeId: "product-selection",
              },
              //   active: true,
            },
          ],
        },
      })
      .execute()
  );
};

export const getProductsInStore = (
  storeKey: string
): Promise<ClientResponse<ProductsInStorePagedQueryResponse>> => {
  return apiRoot
    .inStoreKeyWithStoreKeyValue({ storeKey: storeKey })
    .productSelectionAssignments()
    .get()
    .execute();
};

export const createInStoreCart = (
  storeKey: string,
  customer: ClientResponse<Customer>
): Promise<ClientResponse<Cart>> => {
  return apiRoot
    .inStoreKeyWithStoreKeyValue({ storeKey })
    .carts()
    .post({
      body: {
        customerId: customer.body.id,
        customerEmail: customer.body.email,
        currency: "USD",
        country: "US",
      },
    })
    .execute();
};
