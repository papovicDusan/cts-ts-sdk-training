import { log } from "./utils/logger";
import { apiRoot } from "./handson/client";

// TODO: Complete the functions in
// ./handson/client.ts

// So this code displays the project configuration
// https://docs.commercetools.com/http-api-projects-project.html#get-project

// TODO: Get project settings
// apiRoot.get().execute().then(log).catch(log);

// TODO: Get shipping method by id

// apiRoot
//   .shippingMethods()
//   .withId({ ID: "3b7d4fc9-2092-4aef-b029-9d03c379fe80" })
//   .get()
//   .execute()
//   .then(log)
//   .catch(log);

// TODO: Get standard tax category by key

// apiRoot
//   .taxCategories()
//   .withKey({ key: "keyString" })
//   .get()
//   .execute()
//   .then(log)
//   .catch(log);
