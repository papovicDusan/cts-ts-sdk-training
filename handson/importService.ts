import {
  ProductDraftImport,
  ProductDraftImportRequest,
  ClientResponse,
  ImportContainer,
  ImportSummary,
  ImportOperationPagedResponse,
  ImportOperation,
  ImportResponse,
} from "@commercetools/importapi-sdk";
import csvtojsonV2 from "csvtojson";
import { importApiRoot } from "./client";

// import { ClientResponse, ProductType } from "@commercetools/platform-sdk";
import { ProductType } from "@commercetools/platform-sdk";
import { apiRoot } from "./client";

export const createProductType = async (): Promise<
  ClientResponse<ProductType>
> =>
  await apiRoot
    .productTypes()
    .post({
      body: {
        key: "sync-producttype",
        name: "test_product_type",
        description: "Test product type.",
      },
    })
    .execute();

export const createImportContainer = (
  key: string
): Promise<ClientResponse<ImportContainer>> => {
  return importApiRoot
    .importContainers()
    .post({
      body: {
        key: key,
      },
    })
    .execute();
};

export const checkImportSummary = (
  importContainerKey: string
): Promise<ClientResponse<ImportSummary>> => {
  return importApiRoot
    .importContainers()
    .withImportContainerKeyValue({ importContainerKey: importContainerKey })
    .importSummaries()
    .get()
    .execute();
};

export const checkImportOperationsStatus = (
  importContainerKey: string
): Promise<ClientResponse<ImportOperationPagedResponse>> => {
  return importApiRoot
    .importContainers()
    .withImportContainerKeyValue({ importContainerKey: importContainerKey })
    .importOperations()
    .get()
    .execute();
};

export const checkImportOperationStatusById = (
  id: string
): Promise<ClientResponse<ImportOperation>> => {
  throw new Error("Function not implemented");
};

export const importProductDrafts = async (
  importContainerKey: string
): Promise<ClientResponse<ImportResponse>> => {
  return importApiRoot
    .productDrafts()
    .importContainers()
    .withImportContainerKeyValue({
      importContainerKey: importContainerKey,
    })
    .post({
      body: await createProductDraftImportRequest(),
    })
    .execute();
};

const createProductDraftImportRequest =
  async (): Promise<ProductDraftImportRequest> => ({
    type: "product-draft",
    resources: await getProductDraftImportArray(),
  });

const getProductDraftImportArray = async (): Promise<
  Array<ProductDraftImport>
> => {
  const participantNamePrefix = "tt";

  // Get products data from csv
  const products = await csvtojsonV2().fromFile("./products.csv");

  interface ProductData {
    [key: string]: string;
  }

  const productToProductDraftImport = (
    product: ProductData
  ): ProductDraftImport => {
    return {
      key: participantNamePrefix + "-" + product.productName,
      name: {
        en: product.productName,
        de: product.productName,
      },
      productType: {
        typeId: "product-type",
        key: product.productType,
      },
      slug: {
        en: participantNamePrefix + "-" + product.productName,
        de: participantNamePrefix + "-" + product.productName,
      },
      description: {
        en: product.productDescription,
        de: product.productDescription,
      },
      masterVariant: {
        sku: participantNamePrefix + "-" + product.inventoryId,
        key: participantNamePrefix + "-" + product.productName,
        prices: [
          {
            value: {
              type: "centPrecision",
              currencyCode: product.currencyCode,
              centAmount: parseInt(product.basePrice, 10),
            },
          },
        ],
        images: [
          {
            url: product.imageUrl,
            dimensions: { w: 177, h: 237 },
          },
        ],
      },
    };
  };

  return products.map(productToProductDraftImport);
};
